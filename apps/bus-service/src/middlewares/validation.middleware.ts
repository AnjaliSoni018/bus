import { Request, Response, NextFunction } from 'express';
import { ZodType } from 'zod';
import { AppError } from '../utils/AppError';

export const validate =
  (schema: ZodType<any>, target: 'body' | 'query' | 'params' = 'body') =>
  (req: Request, _res: Response, next: NextFunction) => {
    try {
      const parsed = schema.parse(req[target]);
      req[target] = parsed;
      return next();
    } catch (err: any) {
      const issues = err?.issues ?? err;
      return next(new AppError('Validation failed', 400, { details: issues }));
    }
  };
