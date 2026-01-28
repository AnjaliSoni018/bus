import { kafka } from './kafka';

export const bookingProducer = kafka.producer({
  allowAutoTopicCreation: false,
});
