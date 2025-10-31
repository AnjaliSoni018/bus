import dotenv from 'dotenv';
dotenv.config();

export const env = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  PORT: process.env.PORT || '4002',
  DATABASE_URL: process.env.DATABASE_URL!,
  KAFKA_BROKER: process.env.KAFKA_BROKER || 'localhost:9092',
  REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
  SERVICE_NAME: 'bus-service',
};
