import express from 'express';
import cors from 'cors';
import { json, urlencoded } from 'express';
import router from './routes';
import { logger } from './config/logger';
import { notFoundHandler } from './middlewares/notFound.middleware';
import { errorHandler } from './middlewares/error.middleware';

const app = express();

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
