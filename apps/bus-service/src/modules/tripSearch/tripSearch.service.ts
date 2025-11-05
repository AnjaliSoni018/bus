import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { TripSearchQuery, TripSearchResult } from './tripSearch.types';
import { startOfDay, endOfDay, addHours } from 'date-fns';

export const searchTrips = async (
  query: TripSearchQuery
): Promise<TripSearchResult[]> => {
  const { sourceCity, destinationCity, date, category, minFare, maxFare } =
    query;

  const routes = await prisma.route.findMany({
    where: {
      sourceCity: { equals: sourceCity, mode: 'insensitive' },
      destinationCity: { equals: destinationCity, mode: 'insensitive' },
      isDeleted: false,
    },
    include: { busRoutes: true },
  });

  if (!routes.length) {
    throw new AppError('No route found between given cities', 404);
  }

  const dateStart = addHours(startOfDay(new Date(date)), -5.5);
  const dateEnd = addHours(endOfDay(new Date(date)), -5.5);

  const whereClause: any = {
    routeId: { in: routes.map((r) => r.id) },
    departureAt: { gte: dateStart, lte: dateEnd },
    status: 'SCHEDULED',
    isDeleted: false,
  };

  if (minFare !== undefined || maxFare !== undefined) {
    whereClause.baseFare = {};
    if (minFare !== undefined) whereClause.baseFare.gte = minFare;
    if (maxFare !== undefined) whereClause.baseFare.lte = maxFare;
  }

  if (category) {
    whereClause.bus = { category: category as any };
  }

  const trips = await prisma.trip.findMany({
    where: whereClause,
    include: {
      bus: { include: { busAmenities: true } },
      route: true,
    },
    orderBy: { departureAt: 'asc' },
  });

  if (!trips.length) {
    throw new AppError('No trips found for given criteria', 404);
  }

  const result: TripSearchResult[] = trips.map((t) => ({
    tripId: t.id,
    bus: {
      id: t.bus.id,
      brand: t.bus.brand ?? '',
      category: t.bus.category,
      registrationNo: t.bus.registrationNo,
      amenities: t.bus.busAmenities.map((a) => a.amenity),
    },
    route: {
      id: t.route.id,
      sourceCity: t.route.sourceCity,
      destinationCity: t.route.destinationCity,
      distanceKm: t.route.distanceKm ?? undefined,
      durationMin: t.route.durationMin ?? undefined,
    },
    departureAt: t.departureAt,
    arrivalAt: t.arrivalAt,
    availableSeats: t.availableSeats,
    baseFare: t.baseFare,
    currency: t.currency,
  }));

  return result;
};
