import { Router } from 'express';
import {
  initiatePaymentController,
  mockGatewayCallbackController,
} from './payment.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post('/initiate', authMiddleware, initiatePaymentController);
router.post('/mock/callback', mockGatewayCallbackController);

export default router;
