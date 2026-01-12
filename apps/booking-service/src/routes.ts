import { Router } from 'express';
import healthRoutes from './modules/common/health.routes';
import bookingRoutes from './modules/booking/booking.routes';

const router = Router();

router.use('/', healthRoutes);
router.use('/bookings', bookingRoutes);

export default router;
