import { z } from 'zod';

export const createRouteSchema = z.object({
  sourceCity: z.string().min(2, 'Source city is required'),
  sourceStation: z.string().optional(),
  destinationCity: z.string().min(2, 'Destination city is required'),
  destinationStation: z.string().optional(),
  distanceKm: z.number().optional(),
  durationMin: z.number().optional(),
});

export const updateRouteSchema = z.object({
  sourceCity: z.string().optional(),
  sourceStation: z.string().optional(),
  destinationCity: z.string().optional(),
  destinationStation: z.string().optional(),
  distanceKm: z.number().optional(),
  durationMin: z.number().optional(),
  isDeleted: z.boolean().optional(),
  params: z.object({
    id: z.uuid('Invalid route ID'),
  }),
});

export const listRoutesSchema = z.object({
  sourceCity: z.string().optional(),
  destinationCity: z.string().optional(),
});
