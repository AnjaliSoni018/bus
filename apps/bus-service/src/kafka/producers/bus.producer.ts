import { prisma } from '../../db/prisma';
import { logger } from '../../config/logger';
import { Kafka, Producer } from 'kafkajs';
import { env } from '../../config/env';

let kafkaProducer: Producer | null = null;

async function initProducer() {
  if (kafkaProducer) return kafkaProducer;
  try {
    const kafka = new Kafka({ brokers: [env.KAFKA_BROKER] });
    kafkaProducer = kafka.producer();
    await kafkaProducer.connect();
    logger.info('Kafka producer connected');
    return kafkaProducer;
  } catch (err) {
    logger.warn('Kafka producer init failed, continuing without kafka', err);
    kafkaProducer = null;
    return null;
  }
}
export async function emitBusEvent(
  topic: string,
  key: string | null,
  payload: any
) {
  const record = { topic, key, payload };
  console.log(record);
  try {
    const producer = await initProducer();
    if (!producer) throw new Error('kafka-not-available');
    await producer.send({
      topic,
      messages: [{ key: key ?? undefined, value: JSON.stringify(payload) }],
    });
    logger.info({ topic, key }, 'Published event to kafka');
  } catch (err) {
    logger.warn(err, 'Failed to publish to Kafka - writing to EventQueue');
    try {
      await prisma.eventQueue.create({
        data: {
          topic,
          key,
          payload,
          status: 'PENDING',
        },
      });
    } catch (dbErr) {
      logger.error(dbErr, 'Failed to persist event to EventQueue');
    }
  }
}
