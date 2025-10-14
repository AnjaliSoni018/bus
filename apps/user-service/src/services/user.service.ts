import prisma from '../config/prisma.service';
import { AppError } from '../errors/AppError';

export const getProfile = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      gender: true,
      dob: true,
      role: true,
      isVerified: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!user) throw new AppError('User not found', 404);
  return user;
};

export const updateProfile = async (
  userId: string,
  data: { name?: string; email?: string; gender?: string; dob?: Date }
) => {
  const existing = await prisma.user.findUnique({ where: { id: userId } });
  if (!existing) throw new AppError('User not found', 404);

  const updated = await prisma.user.update({
    where: { id: userId },
    data,
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      gender: true,
      dob: true,
      updatedAt: true,
    },
  });

  return updated;
};
