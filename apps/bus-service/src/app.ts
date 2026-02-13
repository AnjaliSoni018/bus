import express, { Express } from 'express';
import cors from 'cors';
import { json, urlencoded } from 'express';
import router from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/NotFound.middleware';
import { logger } from './config/logger';

const app: Express = express();

app.use(cors());
app.use(json());
app.use(urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/v1', router);

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
