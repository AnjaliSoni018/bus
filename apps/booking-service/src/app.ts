import express from 'express';
import cors from 'cors';
import { json } from 'express';
// import cron from 'node-cron';
import routes from './routes';
import { errorHandler } from './middlewares/error.middleware';
import { notFoundHandler } from './middlewares/NotFound.middleware';
// import { runBookingExpiryWorker } from './modules/booking/workers/booking-expiry.worker';

export const app = express();

app.use(cors());
app.use(json());

app.use('/api/v1', routes);

// cron.schedule('*/1 * * * *', async () => {
//   await runBookingExpiryWorker();
// });

app.use(notFoundHandler);
app.use(errorHandler);
