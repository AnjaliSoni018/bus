import { kafka } from './kafka';
import { logger } from '../config/logger';
import { handlePaymentFailed, handlePaymentSuccess } from './payment.handlers';

const consumer = kafka.consumer({ groupId: 'booking-payment-group' });

export async function startPaymentConsumer() {
  await consumer.connect();

  await consumer.subscribe({
    topic: 'payment.completed',
    fromBeginning: false,
  });

  await consumer.subscribe({
    topic: 'payment.failed',
    fromBeginning: false,
  });

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.value) return;

      const event = JSON.parse(message.value.toString());
      logger.info({ topic, event }, 'Received payment event');

      if (topic === 'payment.completed') {
        await handlePaymentSuccess(event);
      }

      if (topic === 'payment.failed') {
        await handlePaymentFailed(event);
      }
    },
  });
}
