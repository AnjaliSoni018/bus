import { z } from 'zod';

export const createTripSchema = z.object({
  busId: z.uuid(),
  routeId: z.uuid(),
  busRouteId: z.uuid().optional(),
  departureAt: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: 'Invalid departureAt',
  }),
  arrivalAt: z.string().refine((s) => !Number.isNaN(Date.parse(s)), {
    message: 'Invalid arrivalAt',
  }),
  baseFare: z.number().nonnegative(),
  currency: z.string().optional(),
  totalSeats: z.number().int().positive().optional(),
  pricingStrategy: z.enum(['FIXED', 'DYNAMIC']).optional(),
  pricingMeta: z.any().optional(),
  meta: z.any().optional(),
});

export const updateTripSchema = z.object({
  params: z.object({ id: z.uuid() }),
  departureAt: z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), {
      message: 'Invalid departureAt',
    })
    .optional(),
  arrivalAt: z
    .string()
    .refine((s) => !Number.isNaN(Date.parse(s)), {
      message: 'Invalid arrivalAt',
    })
    .optional(),
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
