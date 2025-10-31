import app from './app';
import { env } from './config/env';
import { logger } from './config/logger';

app.listen(env.PORT, () => {
  logger.info(
    `Bus Service running on port ${env.PORT} in ${env.NODE_ENV} mode`
  );
});
