import { kafka } from './kafka';

export const paymentProducer = kafka.producer({
  allowAutoTopicCreation: false,
});
