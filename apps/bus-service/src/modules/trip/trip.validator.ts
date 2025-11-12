import { z } from 'zod';

export const createTripSchema = z.object({
  busRouteId: z.uuid(),
  departureTime: z.string(),
  arrivalTime: z.string(),
  baseFare: z.number().nonnegative(),
  currency: z.string().optional(),
  totalSeats: z.number().int().positive().optional(),
  pricingStrategy: z.enum(['FIXED', 'DYNAMIC']).optional(),
  pricingMeta: z.any().optional(),
  meta: z.any().optional(),
});

export const updateTripSchema = z.object({
  params: z.object({ id: z.uuid() }),
  departureTime: z.string().optional(),
  arrivalTime: z.string().optional(),
  baseFare: z.number().nonnegative().optional(),
  status: z
    .enum(['SCHEDULED', 'CANCELLED', 'DEPARTED', 'COMPLETED', 'DELAYED'])
    .optional(),
  totalSeats: z.number().int().positive().optional(),
  pricingMeta: z.any().optional(),
  meta: z.any().optional(),
});

export const listTripsSchema = z.object({
  page: z.preprocess(
    (v) => (v ? Number(v) : undefined),
    z.number().int().positive().optional()
  ),
  limit: z.preprocess(
    (v) => (v ? Number(v) : undefined),
    z.number().int().positive().optional()
  ),
  date: z.string().optional(),
  routeId: z.string().optional(),
  busId: z.string().optional(),
  status: z.string().optional(),
  search: z.string().optional(),
});

export const tripIdParamSchema = z.object({
  id: z.uuid(),
});
