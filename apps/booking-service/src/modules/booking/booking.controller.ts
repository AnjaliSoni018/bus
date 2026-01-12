import { asyncHandler } from '../../utils/asyncHandler';
import { initiateBookingSchema } from './initiate-booking.dto';
import { initiateBooking } from './booking.service';
import { Request, Response } from 'express';

export const initiateBookingController = asyncHandler(
  async (req: Request, res: Response) => {
    const dto = initiateBookingSchema.parse(req.body);

    if (!req.user) {
      throw new Error('Unauthorized');
    }

    const booking = await initiateBooking(req.user.id, dto);

    res.status(201).json({
      success: true,
      data: booking,
    });
  }
);
