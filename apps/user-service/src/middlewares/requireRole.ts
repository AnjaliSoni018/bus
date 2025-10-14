import { NextFunction, Response } from 'express';
import { AuthRequest } from './auth.middleware';
import { AppError } from '../errors/AppError';

export const requireRole = (...allowed: string[]) => {
  return (req: AuthRequest, res: Response, next: NextFunction) => {
    const role = req.user?.role;
    if (!role) return next(new AppError('Not authenticated', 401));
    if (!allowed.includes(role)) return next(new AppError('Forbidden', 403));
    next();
  };
};
