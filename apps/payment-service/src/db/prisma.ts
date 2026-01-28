import { PrismaClient } from '../generated/prisma';
import { logger } from '../config/logger';

export const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

prisma
  .$connect()
  .then(() => logger.info('Connected to PostgreSQL via Prisma'))
  .catch((err: Error) => {
    logger.error(`Failed to connect to database: ${err.message}`);
    process.exit(1);
  });
