import { Request, Response, NextFunction } from 'express';

interface CustomError extends Error {
  status?: number;
}

export default function errorMiddleware(
  err: CustomError,
  req: Request,
  res: Response,
  _next: NextFunction
) {
  console.error(err);

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Internal Server Error',
  });
}
