import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/user.routes';
import authRoutes from './routes/auth.routes';
import prisma from './config/prisma.service';
import errorMiddleware from './middlewares/error.middleware';
import { errorMessages } from './constants/errorMessages';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);

// health check
app.get('/health', (req, res) => res.json({ ok: true }));

app.use(errorMiddleware);

const PORT = process.env.PORT ?? 3000;

app.listen(PORT, async () => {
  try {
    await prisma.$connect();
    console.log(`User Service running on port ${PORT}`);
  } catch (err) {
    console.error(errorMessages.DB_CONNECTION_ERROR, err);
    process.exit(1);
  }
});
