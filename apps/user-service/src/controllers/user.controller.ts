import { Response, NextFunction } from 'express';
import * as userService from '../services/user.service';
import { AuthRequest } from '../middlewares/auth.middleware';
import { AppError } from '../errors/AppError';

export const getProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Unauthorized', 401);

    const profile = await userService.getProfile(userId);
    res.status(200).json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

export const updateProfile = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user?.id;
    if (!userId) throw new AppError('Unauthorized', 401);

    const { name, email, gender, dob } = req.body;

    const updated = await userService.updateProfile(userId, {
      name,
      email,
      gender,
      dob: dob ? new Date(dob) : undefined,
    });

    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      data: updated,
    });
  } catch (err) {
    next(err);
  }
};
