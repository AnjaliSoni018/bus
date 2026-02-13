import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { SeatState } from '../../generated/prisma';
import { startOfDay } from 'date-fns';

interface HoldSeatsInput {
  seatIds: string[];
  bookingId: string;
  holdUntil: Date;
}

export async function getTripInstanceById(tripInstanceId: string) {
  const tripInstance = await prisma.tripInstance.findUnique({
    where: { id: tripInstanceId },
    include: {
      trip: {
        include: {
          busRoute: {
            include: {
              bus: {
                include: {
                  busAmenities: true,
                  seatTemplate: {
                    include: {
                      seats: { where: { isDeleted: false } },
                    },
                  },
                },
              },
              route: true,
            },
          },
          tripStops: {
            include: { routeStop: true },
            orderBy: { sequence: 'asc' },
          },
        },
      },
      seatStates: { where: { isDeleted: false } },
    },
  });

  if (!tripInstance || tripInstance.isDeleted) {
    throw new AppError('TripInstance not found', 404);
  }

  return tripInstance;
}

export async function createTripInstanceIfNotExists(
  tripId: string,
  journeyDate: Date
) {
  const normalizedDate = startOfDay(journeyDate);

  const trip = await prisma.trip.findUnique({
    where: { id: tripId },
    include: {
      busRoute: {
        include: {
          bus: {
            include: {
              seatTemplate: { include: { seats: true } },
            },
          },
        },
      },
    },
  });

  if (!trip || trip.isDeleted) throw new AppError('Trip not found', 404);

  const seats = trip.busRoute.bus.seatTemplate?.seats ?? [];
  if (!seats.length) throw new AppError('Bus seat template not found', 400);

  const instance = await prisma.tripInstance.upsert({
    where: {
      tripId_journeyDate: {
        tripId,
        journeyDate: normalizedDate,
      },
    },
    update: {},
    create: {
      tripId,
      journeyDate: normalizedDate,
      status: trip.status,
      totalSeats: trip.totalSeats,
      availableSeats: trip.totalSeats,
      seatStates: {
        createMany: {
          data: seats.map((seat) => ({
            seatId: seat.id,
            seatLabel: seat.seatLabel ?? seat.seatNo,
            state: SeatState.AVAILABLE,
            price: trip.baseFare * (seat.priceFactor ?? 1.0),
          })),
        },
      },
    },
    include: {
      seatStates: true,
    },
  });

  return instance;
}

export async function holdSeats(
  tripInstanceId: string,
  { seatIds, bookingId, holdUntil }: HoldSeatsInput
) {
  if (!seatIds?.length) throw new AppError('No seats provided', 400);

  const holdUntilDate = new Date(holdUntil);

  const instance = await prisma.tripInstance.findUnique({
    where: { id: tripInstanceId },
  });

  if (!instance || instance.isDeleted)
    throw new AppError('TripInstance not found', 404);

  return prisma.$transaction(async (tx) => {
    // lock seats
    const result = await tx.tripSeatState.updateMany({
      where: {
        tripInstanceId,
        seatId: { in: seatIds },
        state: SeatState.AVAILABLE,
        isDeleted: false,
      },
      data: {
        state: SeatState.HELD,
        holdToken: bookingId,
        heldUntil: holdUntilDate,
      },
    });

    if (result.count !== seatIds.length) {
      throw new AppError('One or more seats are no longer available', 409);
    }

    await tx.tripInstance.update({
      where: { id: tripInstanceId },
      data: {
        availableSeats: { decrement: seatIds.length },
      },
    });

    return {
      tripInstanceId,
      heldSeats: seatIds,
      heldUntil: holdUntilDate,
    };
  });
}
