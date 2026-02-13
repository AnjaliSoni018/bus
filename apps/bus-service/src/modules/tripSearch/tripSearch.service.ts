import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { TripSearchQuery, TripSearchResult } from './tripSearch.types';
import { startOfDay } from 'date-fns';

export const searchTrips = async (
  query: TripSearchQuery
): Promise<TripSearchResult[]> => {
  const { sourceCity, destinationCity, date, category, minFare, maxFare } =
    query;

  const journeyDate = startOfDay(date ? new Date(date) : new Date());

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
          effectiveFrom: { lte: journeyDate },
          OR: [{ effectiveTo: null }, { effectiveTo: { gte: journeyDate } }],
        },
        include: {
          bus: {
            include: {
              busAmenities: true,
              seatTemplate: {
                include: {
                  seats: {
                    where: { isDeleted: false },
                  },
                },
              },
            },
          },
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
              tripInstances: {
                where: {
                  journeyDate,
                  isDeleted: false,
                },
                include: {
                  seatStates: {
                    where: { isDeleted: false },
                  },
                },
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

  // lazily create missing trip instances
  const createInstancePromises: Promise<any>[] = [];

  for (const route of routes) {
    for (const busRoute of route.busRoutes) {
      for (const trip of busRoute.trips) {
        const existingInstance = trip.tripInstances?.[0];

        if (!existingInstance) {
          const seats = busRoute.bus.seatTemplate?.seats ?? [];

          if (!seats.length) {
            continue; // skip trips with no seat template (bad data)
          }

          createInstancePromises.push(
            prisma.tripInstance.upsert({
              where: {
                tripId_journeyDate: {
                  tripId: trip.id,
                  journeyDate,
                },
              },
              update: {}, // do nothing if exists
              create: {
                tripId: trip.id,
                journeyDate,
                status: 'SCHEDULED',
                totalSeats: trip.totalSeats,
                availableSeats: trip.totalSeats,
                seatStates: {
                  createMany: {
                    data: seats.map((seat) => ({
                      seatId: seat.id,
                      seatLabel: seat.seatLabel ?? seat.seatNo,
                      state: 'AVAILABLE',
                      price: trip.baseFare * (seat.priceFactor ?? 1.0),
                    })),
                  },
                },
              },
            })
          );
        }
      }
    }
  }

  if (createInstancePromises.length > 0) {
    await Promise.all(createInstancePromises);
  }

  // refetch again to include newly created instances
  const routesWithInstances = await prisma.route.findMany({
    where: {
      sourceCity: { equals: sourceCity, mode: 'insensitive' },
      destinationCity: { equals: destinationCity, mode: 'insensitive' },
      isDeleted: false,
    },
    include: {
      busRoutes: {
        where: {
          isDeleted: false,
          effectiveFrom: { lte: journeyDate },
          OR: [{ effectiveTo: null }, { effectiveTo: { gte: journeyDate } }],
        },
        include: {
          bus: {
            include: {
              busAmenities: true,
              seatTemplate: {
                include: {
                  seats: {
                    where: { isDeleted: false },
                  },
                },
              },
            },
          },
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
              tripInstances: {
                where: {
                  journeyDate,
                  isDeleted: false,
                },
                include: {
                  seatStates: {
                    where: { isDeleted: false },
                  },
                },
              },
            },
          },
        },
      },
    },
  });

  const trips = routesWithInstances.flatMap((r) =>
    r.busRoutes.flatMap((br) =>
      br.trips.map((t) => {
        const instance = t.tripInstances?.[0];

        if (!instance) {
          throw new AppError(
            `TripInstance missing for tripId=${
              t.id
            } on date=${journeyDate.toISOString()}`,
            500
          );
        }

        return {
          tripId: t.id,
          tripInstanceId: instance.id, // IMPORTANT

          bus: {
            id: br.bus.id,
            brand: br.bus.brand ?? '',
            category: br.bus.category,
            registrationNo: br.bus.registrationNo,
            amenities: br.bus.busAmenities.map((a) => a.amenity),
          },

          seatTemplate: br.bus.seatTemplate
            ? {
                id: br.bus.seatTemplate.id,
                title: br.bus.seatTemplate.title,
                totalSeats: br.bus.seatTemplate.totalSeats,
                layoutJson: br.bus.seatTemplate.layoutJson,
                seats: br.bus.seatTemplate.seats.map((s) => ({
                  id: s.id,
                  seatNo: s.seatNo,
                  seatLabel: s.seatLabel ?? undefined,
                  type: s.type,
                  row: s.row,
                  column: s.column,
                  deck: s.deck,
                  genderOnly: s.genderOnly ?? false,
                  isAvailable: s.isAvailable,
                  priceFactor: s.priceFactor ?? 1,
                })),
              }
            : null,

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

          tripSeatStates: instance.seatStates.map((tss) => ({
            id: tss.id,
            seatId: tss.seatId,
            seatLabel: tss.seatLabel ?? undefined,
            state: tss.state as string,
            price: tss.price ?? undefined,
          })),

          departureTime: t.departureTime,
          arrivalTime: t.arrivalTime,

          availableSeats: instance.availableSeats, // IMPORTANT
          baseFare: t.baseFare,
          currency: t.currency,
        };
      })
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
