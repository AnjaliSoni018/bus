import { Router } from 'express';
import {
  sendOtpController,
  verifyOtpController,
  registerOperatorController,
  passwordLogin,
  createAdminController,
  approveOperatorController,
  listOperatorsController,
} from '../controllers/auth.controller';
import { requireRole } from '../middlewares/requireRole';
import { requireAuth } from '../middlewares/auth.middleware';

const router = Router();

router.post('/send-otp', sendOtpController);
router.post('/verify-otp', verifyOtpController);
router.post('/register', registerOperatorController);
router.post('/login', passwordLogin);
router.post(
  '/',
  requireAuth,
  requireRole('SUPER_ADMIN'),
  createAdminController
);
router.post(
  '/operators/:id/approve',
  requireAuth,
  requireRole('ADMIN'),
  approveOperatorController
);
router.get(
  '/operators',
  requireAuth,
  requireRole('ADMIN'),
  listOperatorsController
);

export default router;
