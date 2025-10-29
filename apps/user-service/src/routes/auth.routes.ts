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
import { validate } from '../middlewares/zod.middleware';
import {
  loginSchema,
  registerOperatorSchema,
  sendOtpSchema,
  verifyOtpSchema,
} from '../validators/authValidator';

const router = Router();

router.post('/send-otp', validate(sendOtpSchema), sendOtpController);
router.post('/verify-otp', validate(verifyOtpSchema), verifyOtpController);
router.post(
  '/register',
  validate(registerOperatorSchema),
  registerOperatorController
);
router.post('/login', validate(loginSchema), passwordLogin);
router.post(
  '/',
  requireAuth,
  requireRole('SUPER_ADMIN'),
  createAdminController
);
router.patch(
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
