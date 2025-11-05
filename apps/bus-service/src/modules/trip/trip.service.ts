import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { CreateTripDTO, UpdateTripDTO } from './trip.types';
import { emitBusEvent } from '../../kafka/producers/bus.producer';
import { logger } from '../../config/logger';

export async function createTrip(dto: CreateTripDTO, actorId?: string) {
  const bus = await prisma.bus.findUnique({ where: { id: dto.busId } });
  if (!bus || bus.isDeleted) throw new AppError('Bus not found', 404);

  const route = await prisma.route.findUnique({ where: { id: dto.routeId } });
  if (!route || route.isDeleted) throw new AppError('Route not found', 404);

  let busRoute = null;
  if (dto.busRouteId) {
    busRoute = await prisma.busRoute.findUnique({
      where: { id: dto.busRouteId },
    });
    if (!busRoute || busRoute.isDeleted)
      throw new AppError('BusRoute mapping not found', 404);
    if (busRoute.busId !== dto.busId || busRoute.routeId !== dto.routeId) {
      throw new AppError(
        'busRouteId does not match provided busId/routeId',
        400
      );
    }
  } else {
    busRoute = await prisma.busRoute.findFirst({
      where: {
        busId: dto.busId,
        routeId: dto.routeId,
        isDeleted: false,
      },
    });
  }

  const departure = new Date(dto.departureAt);
  const arrival = new Date(dto.arrivalAt);
  if (arrival <= departure)
    throw new AppError('arrivalAt must be after departureAt', 400);

  if (busRoute) {
    if (
      busRoute.effectiveFrom &&
      departure < new Date(busRoute.effectiveFrom)
    ) {
      throw new AppError(
        'Trip departure is before BusRoute effectiveFrom',
        400
      );
    }
    if (busRoute.effectiveTo && departure > new Date(busRoute.effectiveTo)) {
      throw new AppError('Trip departure is after BusRoute effectiveTo', 400);
    }
  }

  const totalSeats = dto.totalSeats ?? bus.totalSeats;
  const created = await prisma.trip.create({
    data: {
      busId: dto.busId,
      routeId: dto.routeId,
      busRouteId: dto.busRouteId ?? null,
      departureAt: departure,
      arrivalAt: arrival,
      durationMin:
        dto.durationMin ??
        Math.max(
          0,
          Math.round((arrival.getTime() - departure.getTime()) / 60000)
        ),
      baseFare: dto.baseFare,
      currency: dto.currency ?? 'INR',
      status: 'SCHEDULED',
      totalSeats,
      availableSeats: totalSeats,
      pricingStrategy: dto.pricingStrategy ?? 'FIXED',
      pricingMeta: dto.pricingMeta ?? null,
      meta: dto.meta ?? null,
      createdBy: actorId ?? null,
      updatedBy: actorId ?? null,
    },
    include: {
      bus: { select: { id: true, registrationNo: true, totalSeats: true } },
      route: true,
      busRoute: true,
    },
  });

  emitBusEvent('trip.created', created.id, {
    id: created.id,
    busId: created.busId,
    routeId: created.routeId,
  }).catch((e) => logger.warn(e, 'emitBusEvent trip.created'));

  return created;
}

export async function listTrips(query: any) {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Number(query.limit || 20), 100);
  const skip = (page - 1) * limit;

  const where: any = { isDeleted: false };

  if (query.busId) where.busId = query.busId;
  if (query.routeId) where.routeId = query.routeId;
  if (query.status) where.status = query.status;

  if (query.date) {
    const day = new Date(query.date);
    const start = new Date(
      Date.UTC(
        day.getUTCFullYear(),
        day.getUTCMonth(),
        day.getUTCDate(),
        0,
        0,
        0
      )
    );
    const end = new Date(start.getTime() + 24 * 60 * 60 * 1000 - 1);
    where.departureAt = { gte: start, lte: end };
  }

  if (query.search) {
    const q = query.search;
    where.OR = [
      { id: { contains: q, mode: 'insensitive' } },
      { bus: { registrationNo: { contains: q, mode: 'insensitive' } } } as any,
    ];
  }

  const [items, total] = await Promise.all([
    prisma.trip.findMany({
      where,
      include: {
        bus: { select: { id: true, registrationNo: true, operatorName: true } },
        route: true,
      },
      skip,
      take: limit,
      orderBy: { departureAt: 'asc' },
    }),
    prisma.trip.count({ where }),
  ]);

  return { meta: { page, limit, total }, items };
}

export async function getTripById(id: string) {
  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      bus: true,
      route: true,
      busRoute: true,
      tripSeatStates: true,
      tripStops: true,
    },
  });
  if (!trip || trip.isDeleted) throw new AppError('Trip not found', 404);
  return trip;
}

export async function updateTrip(
  id: string,
  dto: UpdateTripDTO,
  actorId?: string
) {
  const existing = await prisma.trip.findUnique({ where: { id } });
  if (!existing || existing.isDeleted)
    throw new AppError('Trip not found', 404);

  if (dto.departureAt || dto.arrivalAt) {
    const departure = dto.departureAt
      ? new Date(dto.departureAt as any)
      : existing.departureAt;
    const arrival = dto.arrivalAt
      ? new Date(dto.arrivalAt as any)
      : existing.arrivalAt;
    if (arrival <= departure)
      throw new AppError('arrivalAt must be after departureAt', 400);
  }

  const updated = await prisma.trip.update({
    where: { id },
    data: {
      ...(dto.departureAt !== undefined && { departureAt: dto.departureAt }),
      ...(dto.arrivalAt !== undefined && { arrivalAt: dto.arrivalAt }),
      ...(dto.baseFare !== undefined && { baseFare: dto.baseFare }),
      ...(dto.status !== undefined && { status: dto.status }),
      ...(dto.totalSeats !== undefined && { totalSeats: dto.totalSeats }),
      ...(dto.pricingMeta !== undefined && { pricingMeta: dto.pricingMeta }),
      ...(dto.meta !== undefined && { meta: dto.meta }),
      updatedBy: actorId ?? null,
    },
  });

  emitBusEvent('trip.updated', id, { id }).catch((e) =>
    logger.warn(e, 'emitBusEvent trip.updated')
  );
  return updated;
}

export async function softDeleteTrip(id: string, actorId?: string) {
  const existing = await prisma.trip.findUnique({ where: { id } });
  if (!existing || existing.isDeleted)
    throw new AppError('Trip not found', 404);

  const deleted = await prisma.trip.update({
    where: { id },
    data: { isDeleted: true, updatedBy: actorId ?? null },
  });

  emitBusEvent('trip.deleted', id, { id }).catch((e) =>
    logger.warn(e, 'emitBusEvent trip.deleted')
  );
  return deleted;
}
