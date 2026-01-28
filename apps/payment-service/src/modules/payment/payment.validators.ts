import { z } from 'zod';
import { GatewayProvider, PaymentMethod } from '../../generated/prisma';

export const initiatePaymentSchema = z.object({
  bookingId: z.string(),
  amount: z.number().positive(),
  currency: z.string().default('INR'),
  method: z.nativeEnum(PaymentMethod),
  gateway: z.nativeEnum(GatewayProvider).default(GatewayProvider.MOCK),
});
