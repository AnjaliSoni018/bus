import { Request, Response } from 'express';
import { initiatePaymentSchema } from './payment.validators';
import { initiatePayment, handleGatewayCallback } from './payment.service';
import { asyncHandler } from '../../utils/asyncHandler';

export const initiatePaymentController = asyncHandler(
  async (req: Request, res: Response) => {
    const dto = initiatePaymentSchema.parse(req.body);

    if (!req.user) {
      throw new Error('Unauthorized');
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
    await handleGatewayCallback(req.body);

    res.status(200).json({ success: true });
  }
);
