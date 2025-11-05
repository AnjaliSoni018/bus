import { z } from 'zod';

export const createSeatTemplateSchema = z.object({
  title: z.string().min(2, 'Title is required'),
  description: z.string().optional(),
  totalSeats: z.number().int().positive('Total seats must be positive'),
  layoutJson: z.record(z.string(), z.any()).optional(),
});

export const updateSeatTemplateSchema = z.object({
  title: z.string().min(2).optional(),
  description: z.string().optional(),
  totalSeats: z.number().int().positive().optional(),
  layoutJson: z.record(z.string(), z.any()).optional(),
});

export const listSeatTemplateSchema = z.object({
  query: z
    .object({
      search: z.string().optional(),
    })
    .optional(),
});
