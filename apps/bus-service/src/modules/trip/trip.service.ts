import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { CreateTripDTO, UpdateTripDTO } from './trip.types';
import { emitBusEvent } from '../../kafka/producers/bus.producer';
import { logger } from '../../config/logger';
import { SeatState } from '../../generated/prisma';

interface HoldSeatsInput {
  seatIds: string[];
  bookingId: string;
  holdUntil: string;
}

export async function createTrip(dto: CreateTripDTO, actorId?: string) {
  const busRoute = await prisma.busRoute.findUnique({
    where: { id: dto.busRouteId },
    include: {
      bus: {
        include: {
          seatTemplate: {
            include: { seats: true },
          },
        },
      },
      route: true,
    },
  });

  if (!busRoute || busRoute.isDeleted)
    throw new AppError('BusRoute not found', 404);

  if (busRoute.effectiveFrom && new Date(busRoute.effectiveFrom) > new Date()) {
    throw new AppError('BusRoute is not yet effective', 400);
  }

  if (busRoute.effectiveTo && new Date(busRoute.effectiveTo) < new Date()) {
    throw new AppError('BusRoute is no longer active', 400);
  }

  const departureTime = dto.departureTime;
  const arrivalTime = dto.arrivalTime;

  if (!departureTime || !arrivalTime)
    throw new AppError('departureTime and arrivalTime are required', 400);

  if (arrivalTime <= departureTime)
    throw new AppError('arrivalTime must be after departureTime', 400);

  const totalSeats = dto.totalSeats ?? busRoute.bus.totalSeats;
  const baseFare = dto.baseFare;

  const createdTrip = await prisma.$transaction(async (tx) => {
    const trip = await tx.trip.create({
      data: {
        busRouteId: dto.busRouteId,
        departureTime,
        arrivalTime,
        durationMin:
          dto.durationMin ??
          Math.max(
            0,
            Math.round(
              timeToMinutes(arrivalTime) - timeToMinutes(departureTime)
            )
          ),
        baseFare,
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
    });

    const seats = busRoute.bus.seatTemplate?.seats ?? [];
    if (!seats.length)
      throw new AppError(
        'No seats found for this bus seat template — cannot create trip seat states',
        400
      );

    const tripSeatStates = seats.map((seat) => ({
      tripId: trip.id,
      seatId: seat.id,
      seatLabel: seat.seatLabel ?? seat.seatNo,
      state: SeatState.AVAILABLE,
      price: baseFare * (seat.priceFactor ?? 1.0),
    }));

    await tx.tripSeatState.createMany({ data: tripSeatStates });

    return trip;
  });

  emitBusEvent('trip.created', createdTrip.id, {
    id: createdTrip.id,
    busRouteId: createdTrip.busRouteId,
  }).catch((e) => logger.warn(e, 'emitBusEvent trip.created'));

  return createdTrip;
}

export async function listTrips(query: any) {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Number(query.limit || 20), 100);
  const skip = (page - 1) * limit;

  const where: any = { isDeleted: false };

  if (query.busRouteId) where.busRouteId = query.busRouteId;
  if (query.status) where.status = query.status;

  if (query.search) {
    const q = query.search;
    where.OR = [
      { id: { contains: q, mode: 'insensitive' } },
      {
        busRoute: {
          bus: { registrationNo: { contains: q, mode: 'insensitive' } },
        },
      } as any,
    ];
  }

  const [items, total] = await Promise.all([
    prisma.trip.findMany({
      where,
      include: {
        busRoute: {
          include: {
            bus: {
              select: { id: true, registrationNo: true, operatorName: true },
            },
            route: true,
          },
        },
      },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.trip.count({ where }),
  ]);

  return { meta: { page, limit, total }, items };
}

export async function getTripById(id: string) {
  const trip = await prisma.trip.findUnique({
    where: { id },
    include: {
      busRoute: {
        include: {
          bus: true,
          route: true,
        },
      },
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

  if (dto.departureTime && dto.arrivalTime) {
    if (dto.arrivalTime <= dto.departureTime)
      throw new AppError('arrivalTime must be after departureTime', 400);
  }

  const updated = await prisma.trip.update({
    where: { id },
    data: {
      ...(dto.departureTime && { departureTime: dto.departureTime }),
      ...(dto.arrivalTime && { arrivalTime: dto.arrivalTime }),
      ...(dto.baseFare !== undefined && { baseFare: dto.baseFare }),
      ...(dto.status && { status: dto.status }),
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

function timeToMinutes(time: string): number {
  const [h, m, s] = time.split(':').map(Number);
  return h * 60 + m + (s ? s / 60 : 0);
}

export async function holdSeats(
  tripId: string,
  { seatIds, bookingId, holdUntil }: HoldSeatsInput
) {
  const holdUntilDate = new Date(holdUntil);

  return prisma.$transaction(async (tx) => {
    // 1️⃣ Try to atomically lock AVAILABLE seats only
    const result = await tx.tripSeatState.updateMany({
      where: {
        tripId,
        seatId: { in: seatIds },
        state: 'AVAILABLE',
        isDeleted: false,
      },
      data: {
        state: 'HELD',
        holdToken: bookingId,
        heldUntil: holdUntilDate,
      },
    });

    // 2️⃣ If not all seats were updated → conflict
    if (result.count !== seatIds.length) {
      throw new AppError('One or more seats are no longer available', 409);
    }

    // 3️⃣ Decrement available seats
    await tx.trip.update({
      where: { id: tripId },
      data: {
        availableSeats: {
          decrement: seatIds.length,
        },
      },
    });

    return {
      tripId,
      heldSeats: seatIds,
      heldUntil: holdUntilDate,
    };
  });
}
