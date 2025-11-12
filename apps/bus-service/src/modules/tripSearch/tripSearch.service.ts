import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { TripSearchQuery, TripSearchResult } from './tripSearch.types';
import { startOfDay } from 'date-fns';

export const searchTrips = async (
  query: TripSearchQuery
): Promise<TripSearchResult[]> => {
  const { sourceCity, destinationCity, date, category, minFare, maxFare } =
    query;

  const searchDate = date ? new Date(date) : startOfDay(new Date());

  const routes = await prisma.route.findMany({
    where: {
      sourceCity: { equals: sourceCity, mode: 'insensitive' },
      destinationCity: { equals: destinationCity, mode: 'insensitive' },
      isDeleted: false,
    },
    include: {
      busRoutes: {
        where: {
          isDeleted: false,
          effectiveFrom: { lte: searchDate },
          effectiveTo: { gte: searchDate },
        },
        include: {
          bus: { include: { busAmenities: true } },
          trips: {
            where: {
              isDeleted: false,
              status: 'SCHEDULED',
            },
            include: {
              tripStops: {
                include: { routeStop: true },
                orderBy: { sequence: 'asc' },
              },
            },
          },
        },
      },
    },
  });

  if (!routes.length) {
    throw new AppError('No route found between given cities', 404);
  }
  const trips = routes.flatMap((r) =>
    r.busRoutes.flatMap((br) =>
      br.trips.map((t) => ({
        tripId: t.id,
        bus: {
          id: br.bus.id,
          brand: br.bus.brand ?? '',
          category: br.bus.category,
          registrationNo: br.bus.registrationNo,
          amenities: br.bus.busAmenities.map((a) => a.amenity),
        },
        route: {
          id: r.id,
          sourceCity: r.sourceCity,
          destinationCity: r.destinationCity,
          distanceKm: r.distanceKm ?? undefined,
          durationMin: r.durationMin ?? undefined,
        },
        tripStops: t.tripStops.map((ts) => ({
          id: ts.id,
          name: ts.routeStop.name,
          city: ts.routeStop.city,
          sequence: ts.sequence,
          isBoarding: ts.isBoarding,
          isDropping: ts.isDropping,
        })),
        departureTime: t.departureTime,
        arrivalTime: t.arrivalTime,
        availableSeats: t.availableSeats,
        baseFare: t.baseFare,
        currency: t.currency,
      }))
    )
  );

  const filteredTrips = trips.filter((t) => {
    if (category && t.bus.category !== category) return false;
    if (minFare && t.baseFare < minFare) return false;
    if (maxFare && t.baseFare > maxFare) return false;
    return true;
  });

  if (!filteredTrips.length) {
    throw new AppError('No trips found for given criteria', 404);
  }

  return filteredTrips;
};
