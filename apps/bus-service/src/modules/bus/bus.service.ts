import { prisma } from '../../db/prisma';
import { CreateBusDTO, UpdateBusDTO } from './bus.types';
import { AppError } from '../../utils/AppError';
import { emitBusEvent } from '../../kafka/producers/bus.producer';
import { logger } from '../../config/logger';

/**
 * Create a new bus
 */
export async function createBus(dto: CreateBusDTO, actorId?: string) {
  try {
    const data: any = {
      operatorUserId: dto.operatorUserId ?? actorId,
      registrationNo: dto.registrationNo,
      brand: dto.brand,
      model: dto.model,
      category: dto.category,
      capacity: dto.capacity,
      totalSeats: dto.totalSeats,
      busTemplateId: dto.busTemplateId ?? null,
      hasUpperDeck: dto.hasUpperDeck ?? false,
      createdBy: actorId ?? null,
      updatedBy: actorId ?? null,
    };

    const created = await prisma.bus.create({
      data: {
        ...data,
        busAmenities: dto.amenities
          ? {
              create: dto.amenities.map((a) => ({ amenity: a })),
            }
          : undefined,
        busImages: dto.busImages
          ? {
              create: dto.busImages.map((i) => ({
                url: i.url,
                type: i.type,
                caption: i.caption,
              })),
            }
          : undefined,
      },
      include: {
        busAmenities: true,
        busImages: true,
        seatTemplate: true,
      },
    });

    emitBusEvent('bus.created', created.id, {
      id: created.id,
      operatorUserId: created.operatorUserId,
      registrationNo: created.registrationNo,
    }).catch((e) => logger.warn(e, 'emitBusEvent error'));

    return created;
  } catch (err: any) {
    if (err.code === 'P2002') {
      throw new AppError(
        'Bus with same registration number already exists',
        409,
        { meta: err.meta }
      );
    }
    throw err;
  }
}

/**
 * Get all buses (paginated + filter)
 */
export async function getAllBuses(query: any) {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Number(query.limit || 20), 100);
  const skip = (page - 1) * limit;

  const where: any = { isDeleted: false };

  if (query.operatorUserId) where.operatorUserId = query.operatorUserId;
  if (query.category) where.category = query.category;
  if (query.search) {
    const q = query.search;
    where.OR = [
      { registrationNo: { contains: q, mode: 'insensitive' } },
      { brand: { contains: q, mode: 'insensitive' } },
      { model: { contains: q, mode: 'insensitive' } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.bus.findMany({
      where,
      include: {
        busAmenities: true,
        busImages: true,
        seatTemplate: {
          select: { id: true, title: true, totalSeats: true },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.bus.count({ where }),
  ]);

  return {
    meta: { page, limit, total },
    items,
  };
}

/**
 * Get bus by ID
 */
export async function getBusById(id: string) {
  const bus = await prisma.bus.findUnique({
    where: { id },
    include: {
      busAmenities: true,
      busImages: true,
      seatTemplate: { include: { seats: true } },
    },
  });
  if (!bus || bus.isDeleted) {
    throw new AppError('Bus not found', 404);
  }
  return bus;
}

/**
 * Update bus
 */
export async function updateBus(
  id: string,
  dto: UpdateBusDTO,
  actor?: { id?: string; role?: string }
) {
  const bus = await prisma.bus.findUnique({ where: { id } });
  if (!bus || bus.isDeleted) throw new AppError('Bus not found', 404);

  if (
    actor?.role === 'BUS_OPERATOR' &&
    actor.id &&
    actor.id !== bus.operatorUserId
  ) {
    throw new AppError('Forbidden: operator mismatch', 403);
  }

  const data: any = {
    ...dto,
    updatedBy: actor?.id ?? null,
  };

  if (dto.amenities) {
    await prisma.$transaction([
      prisma.busAmenity.deleteMany({ where: { busId: id } }),
      prisma.bus.update({
        where: { id },
        data: {
          ...data,
          busAmenities: {
            create: dto.amenities.map((a: string) => ({ amenity: a })),
          },
        },
        include: { busAmenities: true, busImages: true, seatTemplate: true },
      }),
    ]);

    const updated = await prisma.bus.findUnique({
      where: { id },
      include: { busAmenities: true, busImages: true, seatTemplate: true },
    });

    emitBusEvent('bus.updated', id, { id }).catch((e) =>
      logger.warn(e, 'emitBusEvent error')
    );
    return updated;
  }

  if (dto.busImages) {
    await prisma.bus.update({
      where: { id },
      data: {
        busImages: {
          create: dto.busImages.map((i) => ({
            url: i.url,
            type: i.type,
            caption: i.caption,
          })),
        },
      },
    });
  }

  const updated = await prisma.bus.update({
    where: { id },
    data,
    include: { busAmenities: true, busImages: true, seatTemplate: true },
  });

  emitBusEvent('bus.updated', id, { id }).catch((e) =>
    logger.warn(e, 'emitBusEvent error')
  );

  return updated;
}

/**
 * Soft delete bus
 */
export async function softDeleteBus(
  id: string,
  actor?: { id?: string; role?: string }
) {
  const bus = await prisma.bus.findUnique({ where: { id } });
  if (!bus || bus.isDeleted) throw new AppError('Bus not found', 404);

  if (
    actor?.role === 'BUS_OPERATOR' &&
    actor.id &&
    actor.id !== bus.operatorUserId
  ) {
    throw new AppError('Forbidden: operator mismatch', 403);
  }

  const updated = await prisma.bus.update({
    where: { id },
    data: { isDeleted: true, updatedBy: actor?.id ?? null },
  });

  emitBusEvent('bus.deleted', id, { id }).catch((e) =>
    logger.warn(e, 'emitBusEvent error')
  );
  return updated;
}
