import { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError';

export default function errorMiddleware(
  err: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error('Error:', err);

  const status = err instanceof AppError ? err.status : 500;
  const message =
    err instanceof AppError ? err.message : 'Something went wrong';

  const response: { success: boolean; message: string; details?: unknown } = {
    success: false,
    message,
  };

  if (err instanceof AppError && err.details) {
    response['details'] = err.details;
  }

  res.status(status).json(response);
}
