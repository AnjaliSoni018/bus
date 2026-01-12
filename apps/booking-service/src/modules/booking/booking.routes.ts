import { Router } from 'express';
import { initiateBookingController } from './booking.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/', authMiddleware, initiateBookingController);

export default router;
