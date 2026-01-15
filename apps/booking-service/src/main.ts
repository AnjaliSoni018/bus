import { app } from './app';
import { env } from './config/env';
import { logger } from './config/logger';

app.listen(env.PORT, () => {
  logger.info(`🚀 Booking service running on port ${env.PORT}`);
});
