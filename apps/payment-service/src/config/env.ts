import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT || 3000),
  NODE_ENV: process.env.NODE_ENV || 'development',
  DATABASE_URL: process.env.DATABASE_URL as string,
  SERVICE_NAME: process.env.SERVICE_NAME || 'payment-service',
};

if (!env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not defined');
}
