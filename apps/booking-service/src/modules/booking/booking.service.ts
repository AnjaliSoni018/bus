import { prisma } from '../../db/prisma';
import { InitiateBookingDTO } from './initiate-booking.dto';
import { AppError } from '../../utils/AppError';
import { BusServiceClient } from '../../clients/bus-service.client';
import { emitBookingCreated } from './booking.events';

export async function initiateBooking(userId: string, dto: InitiateBookingDTO) {
  if (!dto.seats?.length) {
    throw new AppError('No seats selected', 400);
  }

  const tripInstance = await BusServiceClient.getTripInstance(
    dto.tripInstanceId
  );

  if (!tripInstance) throw new AppError('Trip instance not found', 404);

  if (!Array.isArray(tripInstance.seatStates)) {
    throw new AppError('Invalid seat data from bus-service', 500);
  }

  const requestedSeatIds = new Set(dto.seats.map((s) => s.seatId));
  const seatFareMap: Record<string, number> = {};

  for (const seat of tripInstance.seatStates) {
    if (!requestedSeatIds.has(seat.seatId)) continue;

    if (seat.state !== 'AVAILABLE') {
      throw new AppError(`Seat ${seat.seatId} is not available`, 409);
    }

    seatFareMap[seat.seatId] = seat.price;
  }

  if (Object.keys(seatFareMap).length !== requestedSeatIds.size) {
    throw new AppError('One or more seats not found in trip instance', 400);
  }

  const totalAmount = dto.seats.reduce(
    (sum, s) => sum + seatFareMap[s.seatId],
    0
  );

  const bookingRef = `RBX${Math.floor(100000 + Math.random() * 900000)}`;
  const holdToken = `HOLD-${bookingRef}-${Date.now()}`;

  const holdUntil = new Date(Date.now() + 10 * 60 * 1000);

  await BusServiceClient.holdSeats({
    tripInstanceId: dto.tripInstanceId,
    seatIds: [...requestedSeatIds],
    bookingId: holdToken,
    holdUntil,
  });

  const booking = await prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        bookingRef: holdToken,
        userId,

        tripId: tripInstance.tripId, // keep for reference/reporting
        tripInstanceId: tripInstance.id, // IMPORTANT

        operatorUserId: tripInstance.trip.busRoute.bus.operatorUserId,
        routeId: tripInstance.trip.busRoute.routeId,
        busId: tripInstance.trip.busRoute.busId,

        baseFare: tripInstance.trip.baseFare,
        totalAmount,
        bookedSeatsCount: requestedSeatIds.size,
        expiresAt: holdUntil,
      },
    });

    await tx.bookingSeat.createMany({
      data: dto.seats.map((seat) => ({
        bookingId: booking.id,

        tripId: tripInstance.tripId,
        tripInstanceId: tripInstance.id,

        seatId: seat.seatId,
        fare: seatFareMap[seat.seatId],
        state: 'HELD',
        heldUntil: holdUntil,
      })),
    });

    await tx.passenger.createMany({
      data: dto.passengers.map((p) => ({
        ...p,
        bookingId: booking.id,
      })),
    });

    await tx.auditLog.create({
      data: {
        entity: 'BOOKING',
        entityId: booking.id,
        action: 'INITIATED',
        performedBy: userId,
      },
    });

    return booking;
  });

  await emitBookingCreated({
    bookingId: booking.id,
    bookingRef: booking.bookingRef,
    userId,
    amount: booking.totalAmount,
    currency: booking.currency,
  });

  return booking;
}
