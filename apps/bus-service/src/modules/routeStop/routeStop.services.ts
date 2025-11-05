import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { CreateRouteStopDTO, UpdateRouteStopDTO } from './routeStop.types';

export const createRouteStop = async (data: CreateRouteStopDTO) => {
  const routeExists = await prisma.route.findUnique({
    where: { id: data.routeId },
  });
  if (!routeExists) throw new AppError('Route not found', 404);

  return await prisma.routeStop.create({ data });
};

export const getAllRouteStops = async (routeId?: string) => {
  return await prisma.routeStop.findMany({
    where: {
      isDeleted: false,
      ...(routeId ? { routeId } : {}),
    },
    orderBy: { sequence: 'asc' },
  });
};

export const getRouteStopById = async (id: string) => {
  const stop = await prisma.routeStop.findUnique({
    where: { id },
    include: { route: true },
  });
  if (!stop) throw new AppError('Route stop not found', 404);
  return stop;
};

export const updateRouteStop = async (id: string, data: UpdateRouteStopDTO) => {
  const existing = await prisma.routeStop.findUnique({ where: { id } });
  if (!existing) throw new AppError('Route stop not found', 404);

  return await prisma.routeStop.update({ where: { id }, data });
};

export const deleteRouteStop = async (id: string) => {
  const existing = await prisma.routeStop.findUnique({ where: { id } });
  if (!existing) throw new AppError('Route stop not found', 404);

  return await prisma.routeStop.update({
    where: { id },
    data: { isDeleted: true },
  });
};
