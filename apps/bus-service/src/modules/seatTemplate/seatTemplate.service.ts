import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { SeatTemplatePayload } from './seatTemplate.types';

export const createSeatTemplate = async (payload: SeatTemplatePayload) => {
  const exists = await prisma.seatTemplate.findFirst({
    where: { title: payload.title, isDeleted: false },
  });

  if (exists) {
    throw new AppError('Seat template with this title already exists', 400);
  }

  return prisma.seatTemplate.create({
    data: payload,
  });
};

export const getAllSeatTemplates = async (search?: string) => {
  return prisma.seatTemplate.findMany({
    where: {
      isDeleted: false,
      ...(search
        ? {
            OR: [
              { title: { contains: search, mode: 'insensitive' } },
              { description: { contains: search, mode: 'insensitive' } },
            ],
          }
        : {}),
    },
    orderBy: { createdAt: 'desc' },
  });
};

export const getSeatTemplateById = async (id: string) => {
  const seatTemplate = await prisma.seatTemplate.findFirst({
    where: { id, isDeleted: false },
  });

  if (!seatTemplate) throw new AppError('Seat template not found', 404);
  return seatTemplate;
};

export const updateSeatTemplate = async (
  id: string,
  payload: Partial<SeatTemplatePayload>
) => {
  const existing = await prisma.seatTemplate.findFirst({
    where: { id, isDeleted: false },
  });

  if (!existing) throw new AppError('Seat template not found', 404);

  return prisma.seatTemplate.update({
    where: { id },
    data: { ...payload },
  });
};

export const deleteSeatTemplate = async (id: string) => {
  const existing = await prisma.seatTemplate.findFirst({
    where: { id, isDeleted: false },
  });

  if (!existing) throw new AppError('Seat template not found', 404);

  return prisma.seatTemplate.update({
    where: { id },
    data: { isDeleted: true },
  });
};
