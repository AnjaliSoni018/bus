import { z } from 'zod';

export const tripInstanceIdParamSchema = z.object({
  tripInstanceId: z.string().uuid(),
});

export const holdSeatsSchema = z.object({
  seatIds: z.array(z.string().uuid()).min(1),
  bookingId: z.string().min(3),
  holdUntil: z.string(),
});
