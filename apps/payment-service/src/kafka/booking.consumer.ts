import { kafka } from './kafka';
import { initiatePayment } from '../modules/payment/payment.service';
import { logger } from '../config/logger';
import { GatewayProvider, PaymentMethod } from '../generated/prisma';

const consumer = kafka.consumer({
  groupId: 'payment-booking-group',
});

export async function startBookingConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: 'booking.created',
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ message }) => {
      if (!message.value) return;

      const event = JSON.parse(message.value.toString());

      logger.info({ event }, 'Received booking.created event');

      /**
       * Expected event shape from booking-service:
       * {
       *   eventType: 'BOOKING_CREATED',
       *   bookingId: string,
       *   userId: string,
       *   amount: number,
       *   currency: string
       * }
       */

      await initiatePayment({
        bookingId: event.bookingId,
        userId: event.userId,
        amount: event.amount,
        currency: event.currency,
        method: PaymentMethod.CARD,
        gateway: GatewayProvider.MOCK,
      });
    },
  });
}
