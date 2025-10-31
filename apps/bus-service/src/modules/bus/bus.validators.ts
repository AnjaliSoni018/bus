import { z } from 'zod';

export const BusCategoryEnum = z.enum([
  'SEATER',
  'SLEEPER',
  'SEMI_SLEEPER',
  'SLEEPER_AC',
  'SEATER_AC',
  'VOLVO',
  'MINI',
]);

export const AmenityEnum = z.enum([
  'WIFI',
  'CHARGING_POINT',
  'BLANKET',
  'WATER_BOTTLE',
  'AC',
  'TV',
  'READING_LIGHT',
  'LUGGAGE',
  'SNACK',
]);

export const createBusSchema = z.object({
  registrationNo: z.string().min(1),
  brand: z.string().optional(),
  model: z.string().optional(),
  category: BusCategoryEnum,
  capacity: z.number().int().positive(),
  totalSeats: z.number().int().positive(),
  busTemplateId: z.uuid().optional().nullable(),
  hasUpperDeck: z.boolean().optional(),
  busImages: z
    .array(
      z.object({
        url: z.url(),
        type: z.string().optional(),
        caption: z.string().optional(),
      })
    )
    .optional(),
  amenities: z.array(AmenityEnum).optional(),
});

export const updateBusSchema = createBusSchema.partial();

export const listBusesSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  operatorId: z.uuid().optional(),
  category: z.string().optional(),
  isDeleted: z.string().optional(),
  search: z.string().optional(),
});
