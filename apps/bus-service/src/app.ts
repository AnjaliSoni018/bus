// import express from 'express';
// // import bodyParser from 'body-parser';
// import dotenv from 'dotenv';
// import { json, urlencoded } from 'body-parser';
// import busRoutes from './routes/bus-routes';
// import healthRouter from './routes/health.js';
// import { ERROR_MESSAGES } from './constants/errorMessages';

// dotenv.config();

// const app = express();

// app.use(json());
// app.use(urlencoded({ extended: true }));

// // Basic health
// app.use('/health', healthRouter);

// // API routes
// app.use('/api', busRoutes);

// // 404 handler
// app.use((req, res) =>
//   res.status(404).json({ ok: false, error: ERROR_MESSAGES.NOT_FOUND })
// );

// export default app;
