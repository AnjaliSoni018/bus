import app from './app';
import { env } from './config/env';
import { logger } from './config/logger';
import { startBookingConsumer } from './kafka/booking.consumer';
import { paymentProducer } from './kafka/payment.producer';
// import dotenv from 'dotenv';

// dotenv.config();
console.log(env.PORT);
async function bootstrap() {
  await paymentProducer.connect();
  await startBookingConsumer();
  logger.info('✅ Booking consumer started');

  app.listen(env.PORT, '0.0.0.0', () => {
    logger.info(`🚀 payment service running on port ${env.PORT}`);
  });
}
bootstrap();
