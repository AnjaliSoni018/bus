import { Router } from 'express';
import healthRoutes from './modules/common/health.routes';
import paymentRoutes from './modules/payment/payment.routes';
const router = Router();

router.use('/', healthRoutes);
router.use('/payment', paymentRoutes);

export default router;
