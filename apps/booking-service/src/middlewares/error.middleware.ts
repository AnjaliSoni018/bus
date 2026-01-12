import { Request, Response, NextFunction } from 'express';
import { logger } from '../config/logger';

export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  logger.error(err);

  const status = err.statusCode || 500;
  const message =
    err.message || 'Internal Server Error. Please try again later.';

  res.status(status).json({
    success: false,
    message,
  });
}
