import { z } from 'zod';

export const createRouteStopSchema = z.object({
  routeId: z.uuid(),
  name: z.string().min(2),
  city: z.string().min(2),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
  sequence: z.number().int().min(1),
  arrivalOffsetMin: z.number().int().optional(),
  isBoardingPoint: z.boolean().optional(),
  isDroppingPoint: z.boolean().optional(),
});

export const updateRouteStopSchema = createRouteStopSchema.partial();

export const listRouteStopsSchema = z.object({
  routeId: z.uuid().optional(),
});
