import express from 'express';
import cors from 'cors';
import { json } from 'express';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/NotFound.middleware';

export const app = express();

app.use(cors());
app.use(json());

app.use('/api/v1', routes);

app.use(notFoundHandler);
app.use(errorHandler);
