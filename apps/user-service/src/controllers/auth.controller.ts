// import { Request, Response, NextFunction } from 'express';
// import * as authService from '../services/auth.service';

// export const sendOtpController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { phone } = req.body;
//     const result = await authService.sendOtp(phone);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// };

// export const verifyOtpController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { phone, otp, name, email } = req.body;
//     const result = await authService.verifyOtp(phone, otp, name, email);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// };
// apps/user-service/src/controllers/auth.controller.ts
// import { Request, Response, NextFunction } from 'express';
// import * as authService from '../services/auth.service';

// export const sendOtpController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { phone } = req.body;
//     const ip = (req.headers['x-forwarded-for'] as string | undefined) ?? req.ip;
//     const deviceId = (req.headers['x-device-id'] as string | undefined) ?? null;
//     const result = await authService.sendOtp(phone, ip, deviceId);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// };

// export const verifyOtpController = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const { phone, otp, name, email } = req.body;
//     const result = await authService.verifyOtp(phone, otp, name, email);
//     res.status(200).json(result);
//   } catch (err) {
//     next(err);
//   }
// };
