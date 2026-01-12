import { z } from 'zod';

export const initiateBookingSchema = z
  .object({
    tripId: z.uuid(),

    seats: z
      .array(
        z.object({
          seatId: z.uuid(),
        })
      )
      .min(1, 'At least one seat is required'),

    passengers: z
      .array(
        z.object({
          name: z.string().min(1),
          gender: z.string().optional(),
          age: z.number().int().positive().optional(),
          phone: z.string().optional(),
          email: z.string().email().optional(),
          isPrimary: z.boolean().optional(),
        })
      )
      .min(1),
  })
  .refine((data) => data.seats.length === data.passengers.length, {
    message: 'Seats count must match passengers count',
    path: ['seats'],
  })
  .refine((data) => data.passengers.filter((p) => p.isPrimary).length === 1, {
    message: 'Exactly one primary passenger is required',
    path: ['passengers'],
  });

export type InitiateBookingDTO = z.infer<typeof initiateBookingSchema>;
