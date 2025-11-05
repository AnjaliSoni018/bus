import { z } from 'zod';

const seatObject = z.object({
  templateId: z.uuid(),
  seatNo: z.string().min(1),
  seatLabel: z.string().optional(),
  type: z
    .enum([
      'REGULAR',
      'LOWER',
      'UPPER',
      'MIDDLE',
      'SIDE_LOWER',
      'SIDE_UPPER',
      'WOMAN_ONLY',
      'WHEELCHAIR',
    ])
    .optional(),
  row: z.number().int().optional(),
  column: z.number().int().optional(),
  deck: z.number().int().optional(),
  priceFactor: z.number().positive().optional(),
  genderOnly: z.boolean().optional(),
});

export const createSeatSchema = z.union([seatObject, z.array(seatObject)]);

export const listSeatsSchema = z.object({
  templateId: z.uuid().optional(),
  seatNo: z.string().optional(),
  type: z.string().optional(),
  page: z.preprocess(
    (v) => (v ? Number(v) : undefined),
    z.number().int().positive().optional()
  ),
  limit: z.preprocess(
    (v) => (v ? Number(v) : undefined),
    z.number().int().positive().optional()
  ),
});

export const updateSeatSchema = z.object({
  id: z.uuid(),
  seatLabel: z.string().optional(),
  type: z
    .enum([
      'REGULAR',
      'LOWER',
      'UPPER',
      'MIDDLE',
      'SIDE_LOWER',
      'SIDE_UPPER',
      'WOMAN_ONLY',
      'WHEELCHAIR',
    ])
    .optional(),
  row: z.number().int().optional(),
  column: z.number().int().optional(),
  deck: z.number().int().optional(),
  priceFactor: z.number().positive().optional(),
  genderOnly: z.boolean().optional(),
  isAvailable: z.boolean().optional(),
});

export const seatIdParamSchema = z.object({
  id: z.uuid(),
});
