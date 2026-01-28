import { Kafka } from 'kafkajs';
// import fs from 'fs';

console.log({
  mechanism: process.env.KAFKA_SASL_MECHANISM,
  username: process.env.KAFKA_USERNAME,
  passwordLength: process.env.KAFKA_PASSWORD?.length,
  kafkabroker: process.env.KAFKA_BROKERS,
});

const caCert = Buffer.from(process.env.KAFKA_CA_CERT!, 'base64').toString(
  'utf-8'
);

export const kafka = new Kafka({
  clientId: 'booking-service',
  brokers: process.env.KAFKA_BROKERS!.split(','),
  ssl: {
    ca: [caCert!],
  },
  sasl: {
    mechanism: 'scram-sha-256',
    username: process.env.KAFKA_USERNAME!,
    password: process.env.KAFKA_PASSWORD!,
  },
  retry: {
    retries: 0,
  },
  connectionTimeout: 10000,
  authenticationTimeout: 10000,
  requestTimeout: 30000,
});

// const TOPIC = 'booking.created'; // EXACT name as in Aiven
