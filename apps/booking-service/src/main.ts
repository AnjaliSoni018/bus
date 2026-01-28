import { startPaymentConsumer } from './kafka/payment.consumer';
import { logger } from './config/logger';
import { env } from './config/env';
import { app } from './app';
import { bookingProducer } from './kafka/booking.producer';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  await bookingProducer.connect();
  await startPaymentConsumer();
  logger.info('✅ Payment consumer started');

  app.listen(env.PORT, () => {
    logger.info(`🚀 Booking service running on ${env.PORT}`);
  });
}

bootstrap();
