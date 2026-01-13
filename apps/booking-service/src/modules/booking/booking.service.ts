import { prisma } from '../../db/prisma';
import { InitiateBookingDTO } from './initiate-booking.dto';
import { AppError } from '../../utils/AppError';
import { BusServiceClient } from '../../clients/bus-service.client';
import { Prisma } from '@prisma/client';

export async function initiateBooking(userId: string, dto: InitiateBookingDTO) {
  if (!dto.seats?.length) {
    throw new AppError('No seats selected', 400);
  }

  const trip = await BusServiceClient.getTrip(dto.tripId);

  if (!trip) {
    throw new AppError('Trip not found', 404);
  }

  if (!Array.isArray(trip.tripSeatStates)) {
    throw new AppError('Invalid seat data from bus-service', 500);
  }

  const requestedSeatIds = new Set(dto.seats.map((s) => s.seatId));
  const seatFareMap: Record<string, number> = {};

  for (const seat of trip.tripSeatStates) {
    if (!requestedSeatIds.has(seat.seatId)) continue;

    if (seat.state !== 'AVAILABLE') {
      throw new AppError(`Seat ${seat.seatId} is not available`, 409);
    }

    seatFareMap[seat.seatId] = seat.price;
  }

  if (Object.keys(seatFareMap).length !== requestedSeatIds.size) {
    throw new AppError('One or more seats not found in trip', 400);
  }

  const totalAmount = dto.seats.reduce(
    (sum, s) => sum + seatFareMap[s.seatId],
    0
  );

  const holdToken = `RBX-${Date.now()}`;
  const holdUntil = new Date(Date.now() + 10 * 60 * 1000);

  await BusServiceClient.holdSeats({
    tripId: dto.tripId,
    seatIds: [...requestedSeatIds],
    bookingId: holdToken,
    holdUntil,
  });

  return prisma.$transaction(async (tx: Prisma.TransactionClient) => {
    const booking = await tx.booking.create({
      data: {
        bookingRef: holdToken,
        userId,
        tripId: dto.tripId,

        operatorUserId: trip.busRoute.bus.operatorUserId,
        routeId: trip.busRoute.routeId,
        busId: trip.busRoute.busId,

        baseFare: trip.baseFare,
        totalAmount,
        bookedSeatsCount: requestedSeatIds.size,
        expiresAt: holdUntil,
      },
    });

    await tx.bookingSeat.createMany({
      data: dto.seats.map((seat) => ({
        bookingId: booking.id,
        tripId: dto.tripId,
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
}
