import { z } from 'zod';

export const createTripStopSchema = z.object({
  tripId: z.uuid(),
  routeStopId: z.uuid(),
  scheduledArrival: z.coerce.date().optional(),
  scheduledDeparture: z.coerce.date().optional(),
  sequence: z.number().min(1),
  isBoarding: z.boolean().optional(),
  isDropping: z.boolean().optional(),
});

export const updateTripStopSchema = z.object({
  scheduledArrival: z.coerce.date().optional(),
  scheduledDeparture: z.coerce.date().optional(),
  isBoarding: z.boolean().optional(),
  isDropping: z.boolean().optional(),
});

export const listTripStopsSchema = z.object({
  tripId: z.uuid().optional(),
});
