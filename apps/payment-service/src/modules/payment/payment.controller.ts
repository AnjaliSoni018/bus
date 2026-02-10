import { Request, Response } from 'express';
import crypto from 'crypto';
import { initiatePaymentSchema } from './payment.validators';
import {
  initiatePayment,
  handleGatewayCallback,
  handleRazorpayVerification,
} from './payment.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { AppError } from '../../utils/AppError';

export const initiatePaymentController = asyncHandler(
  async (req: Request, res: Response) => {
    const dto = initiatePaymentSchema.parse(req.body);

    if (!req.user) {
      throw new AppError('Unauthorized', 401);
    }

    const payment = await initiatePayment({
      ...dto,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      data: payment,
    });
  }
);

export const mockGatewayCallbackController = asyncHandler(
  async (req: Request, res: Response) => {
    const signature = req.headers['x-mock-signature'];

    if (!signature) {
      throw new AppError('Missing gateway signature', 401);
    }

    const expected = crypto
      .createHmac('sha256', process.env.MOCK_GATEWAY_SECRET!)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (signature !== expected) {
      throw new AppError('Invalid gateway signature', 401);
    }

    await handleGatewayCallback(req.body);

    res.status(200).json({ success: true });
  }
);

export const razorpayVerifyController = asyncHandler(
  async (req: Request, res: Response) => {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      throw new AppError('Missing Razorpay verification fields', 400);
    }

    await handleRazorpayVerification({
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });

    res.status(200).json({ success: true });
  }
);
