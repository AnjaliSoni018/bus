import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.util';
import prisma from '../config/prisma.service';
import { AppError } from '../errors/AppError';

interface JwtPayload {
  id: string;
  role: string;
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
    phone?: string | null;
  };
}

export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const auth = req.headers.authorization;
    if (!auth) throw new AppError('Authorization header missing', 401);

    const token = auth.split(' ')[1];
    const payload = verifyJwt(token) as JwtPayload;

    const session = await prisma.session.findUnique({
      where: { token },
    });
    if (!session) throw new AppError('Invalid session', 401);

    const user = await prisma.user.findUnique({ where: { id: payload.id } });
    if (!user) throw new AppError('User not found', 401);

    req.user = {
      id: user.id,
      role: user.role,
      phone: user.phone,
    };

    next();
  } catch (err) {
    next(err);
  }
};
