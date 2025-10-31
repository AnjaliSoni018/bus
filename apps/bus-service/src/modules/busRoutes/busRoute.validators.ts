import { z } from 'zod';

export const createBusRouteSchema = z.object({
  busId: z.uuid(),
  routeId: z.uuid(),
  effectiveFrom: z.coerce.date().optional(),
  effectiveTo: z.coerce.date().optional(),
});

export const updateBusRouteSchema = z.object({
  effectiveFrom: z.coerce.date().optional(),
  effectiveTo: z.coerce.date().optional(),
});

export const busRouteIdParamSchema = z.object({
  id: z.uuid(),
});
