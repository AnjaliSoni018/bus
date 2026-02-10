import { Router } from 'express';
import {
  initiatePaymentController,
  mockGatewayCallbackController,
  razorpayVerifyController,
} from './payment.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/initiate', authMiddleware, initiatePaymentController);
router.post('/mock/callback', mockGatewayCallbackController);
router.post('/razorpay/verify', authMiddleware, razorpayVerifyController);

export default router;
