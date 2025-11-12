import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { emitBusEvent } from '../../kafka/producers/bus.producer';
import { logger } from '../../config/logger';
import { CreateBusRouteDTO, UpdateBusRouteDTO } from './busRoute.type';

export async function createBusRoute(dto: CreateBusRouteDTO, actorId?: string) {
  const bus = await prisma.bus.findUnique({ where: { id: dto.busId } });
  if (!bus || bus.isDeleted) throw new AppError('Bus not found', 404);

  const route = await prisma.route.findUnique({ where: { id: dto.routeId } });
  if (!route || route.isDeleted) throw new AppError('Route not found', 404);

  const existing = await prisma.busRoute.findFirst({
    where: {
      busId: dto.busId,
      routeId: dto.routeId,
      isDeleted: false,
    },
  });
  if (existing) {
    throw new AppError('This bus is already assigned to this route', 409);
  }
  if (dto.effectiveFrom && dto.effectiveTo) {
    const from = new Date(dto.effectiveFrom);
    const to = new Date(dto.effectiveTo);
    if (from > to)
      throw new AppError('effectiveFrom must be before effectiveTo', 400);
  }

  const created = await prisma.busRoute.create({
    data: {
      busId: dto.busId,
      routeId: dto.routeId,
      effectiveFrom: dto.effectiveFrom ?? null,
      effectiveTo: dto.effectiveTo ?? null,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  });

  emitBusEvent('busroute.created', created.id, {
    id: created.id,
    busId: created.busId,
    routeId: created.routeId,
  }).catch((e) => logger.warn(e, 'emitBusEvent busroute.created'));

  return created;
}

export async function listBusRoutes(query: any) {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Number(query.limit || 20), 100);
  const skip = (page - 1) * limit;

  const where: any = { isDeleted: false };

  if (query.busId) where.busId = query.busId;
  if (query.routeId) where.routeId = query.routeId;

  if (query.activeOnly === 'true' || query.activeOnly === true) {
    const now = new Date();
    where.AND = [
      {
        OR: [{ effectiveFrom: null }, { effectiveFrom: { lte: now } }],
      },
      {
        OR: [{ effectiveTo: null }, { effectiveTo: { gte: now } }],
      },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.busRoute.findMany({
      where,
      include: {
        bus: {
          select: {
            id: true,
            brand: true,
            registrationNo: true,
            operatorName: true,
            category: true,
          },
        },
        route: {
          select: { id: true, sourceCity: true, destinationCity: true },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.busRoute.count({ where }),
  ]);

  return { meta: { page, limit, total }, items };
}
export async function getBusRouteById(id: string) {
  const record = await prisma.busRoute.findUnique({
    where: { id },
    include: {
      bus: true,
      route: { include: { stops: true } },
    },
  });
  if (!record || record.isDeleted)
    throw new AppError('BusRoute mapping not found', 404);
  return record;
}

export async function updateBusRoute(
  id: string,
  dto: UpdateBusRouteDTO,
  actorId?: string
) {
  const existing = await prisma.busRoute.findUnique({ where: { id } });
  if (!existing || existing.isDeleted)
    throw new AppError('BusRoute mapping not found', 404);

  if (dto.effectiveFrom && dto.effectiveTo) {
    const from = new Date(dto.effectiveFrom);
    const to = new Date(dto.effectiveTo);
    if (from > to)
      throw new AppError('effectiveFrom must be before effectiveTo', 400);
  }

  const updated = await prisma.busRoute.update({
    where: { id },
    data: {
      ...(dto.effectiveFrom !== undefined && {
        effectiveFrom: dto.effectiveFrom ?? null,
      }),
      ...(dto.effectiveTo !== undefined && {
        effectiveTo: dto.effectiveTo ?? null,
      }),
      updatedAt: new Date(),
    },
  });

  emitBusEvent('busroute.updated', id, { id }).catch((e) =>
    logger.warn(e, 'emitBusEvent busroute.updated')
  );

  return updated;
}

export async function softDeleteBusRoute(id: string, actorId?: string) {
  const existing = await prisma.busRoute.findUnique({ where: { id } });
  if (!existing || existing.isDeleted)
    throw new AppError('BusRoute mapping not found', 404);

  const deleted = await prisma.busRoute.update({
    where: { id },
    data: { isDeleted: true, updatedAt: new Date() },
  });

  emitBusEvent('busroute.deleted', id, { id }).catch((e) =>
    logger.warn(e, 'emitBusEvent busroute.deleted')
  );

  return deleted;
}
