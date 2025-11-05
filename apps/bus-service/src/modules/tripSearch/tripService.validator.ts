import { z } from 'zod';

export const tripSearchSchema = z.object({
  sourceCity: z.string().min(2, 'sourceCity is required'),
  destinationCity: z.string().min(2, 'destinationCity is required'),
  date: z
    .string()
    .regex(
      /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
      'Invalid date format, expected YYYY-MM-DD'
    ),
  category: z.string().optional(),
  minFare: z.coerce.number().optional(),
  maxFare: z.coerce.number().optional(),
});

export type TripSearchQuery = z.infer<typeof tripSearchSchema>;
