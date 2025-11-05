import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { CreateTripStopInput, UpdateTripStopInput } from './tripStop.types';

export const createTripStop = async (data: CreateTripStopInput) => {
  const { tripId, routeStopId, sequence } = data;
  console.log(sequence);

  const trip = await prisma.trip.findUnique({ where: { id: tripId } });
  if (!trip) throw new AppError('Trip not found', 404);

  const routeStop = await prisma.routeStop.findUnique({
    where: { id: routeStopId },
  });
  if (!routeStop) throw new AppError('Route stop not found', 404);

  const exists = await prisma.tripStop.findFirst({
    where: { tripId, routeStopId },
  });
  if (exists) throw new AppError('Trip stop already exists', 400);

  return prisma.tripStop.create({ data });
};

export const listTripStops = async (tripId?: string) => {
  return prisma.tripStop.findMany({
    where: { tripId },
    include: {
      routeStop: true,
      trip: { select: { id: true, departureAt: true } },
    },
    orderBy: { sequence: 'asc' },
  });
};

export const getTripStopById = async (id: string) => {
  const stop = await prisma.tripStop.findUnique({
    where: { id },
    include: { routeStop: true, trip: true },
  });
  if (!stop) throw new AppError('Trip stop not found', 404);
  return stop;
};

export const updateTripStop = async (id: string, data: UpdateTripStopInput) => {
  const existing = await prisma.tripStop.findUnique({ where: { id } });
  if (!existing) throw new AppError('Trip stop not found', 404);

  return prisma.tripStop.update({ where: { id }, data });
};

export const deleteTripStop = async (id: string) => {
  const existing = await prisma.tripStop.findUnique({ where: { id } });
  if (!existing) throw new AppError('Trip stop not found', 404);

  return prisma.tripStop.delete({ where: { id } });
};
