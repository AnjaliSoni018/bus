import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { apiResponse } from '../utils/apiResponse';
import { logger } from '../config/logger';

interface JwtPayload {
  id: string;
  role: string;
  email?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: JwtPayload | undefined;
    }
  }
}

export const authMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      logger.warn('Authorization header missing or invalid');
      return apiResponse.unauthorized(res, 'Authorization token missing');
    }

    const token = authHeader.split(' ')[1];
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new Error('JWT_SECRET not configured');
    }

    const decoded = jwt.verify(token, secret) as JwtPayload;
    req.user = decoded;

    logger.info(`Authenticated request by user: ${decoded.id}`);
    next();
  } catch (err: any) {
    logger.error(`Auth error: ${err.message}`);
    return apiResponse.unauthorized(res, 'Invalid or expired token');
  }
};
