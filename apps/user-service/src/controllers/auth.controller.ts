import { Request, Response, NextFunction } from 'express';
import * as authService from '../services/auth.service';
import { AuthRequest } from '../middlewares/auth.middleware';

export const sendOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone } = req.body;
    const ip: string =
      req.ip || req.headers['x-forwarded-for']?.toString() || 'unknown';
    const deviceId = (req.headers['x-device-id'] as string | undefined) ?? null;
    const result = await authService.sendOtp(phone, ip, deviceId);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const verifyOtpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { phone, otp, name, email } = req.body;
    const result = await authService.verifyOtp(phone, otp, name, email);
    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};

export const registerOperatorController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const payload = req.body;
    const result = await authService.registerOperator(payload);
    res.status(201).json({
      success: true,
      message: 'Bus operator registration submitted successfully',
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const passwordLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const ip =
      (req.headers['x-forwarded-for'] as string | undefined) ??
      req.ip ??
      'unknown';
    const result = await authService.loginWithPassword(email, password, ip);
    res.json({ success: true, ...result });
  } catch (err) {
    next(err);
  }
};

export const createAdminController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const creatorId = req.user!.id;
    const { email, password, name } = req.body;
    const admin = await authService.createAdmin(creatorId, {
      email,
      password,
      name,
    });
    res.status(201).json({ success: true, data: admin });
  } catch (err) {
    next(err);
  }
};

export const approveOperatorController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const operatorId = req.params.id;
    const profile = await authService.approveOperator(operatorId);
    res.json({ success: true, data: profile });
  } catch (err) {
    next(err);
  }
};

export const listOperatorsController = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const items = await authService.listOperators();
    res.json({ success: true, data: items });
  } catch (err) {
    next(err);
  }
};
