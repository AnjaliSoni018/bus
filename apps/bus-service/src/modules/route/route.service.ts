import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { CreateRouteDTO, UpdateRouteDTO } from './route.types';

export async function createRoute(dto: CreateRouteDTO) {
  const existing = await prisma.route.findFirst({
    where: {
      sourceCity: { equals: dto.sourceCity, mode: 'insensitive' },
      destinationCity: { equals: dto.destinationCity, mode: 'insensitive' },
      isDeleted: false,
    },
  });

  if (existing) {
    throw new AppError('Route already exists between these cities', 409);
  }

  const created = await prisma.route.create({
    data: {
      sourceCity: dto.sourceCity,
      sourceStation: dto.sourceStation ?? null,
      destinationCity: dto.destinationCity,
      destinationStation: dto.destinationStation ?? null,
      distanceKm: dto.distanceKm ?? null,
      durationMin: dto.durationMin ?? null,
    },
  });

  return created;
}

export async function getAllRoutes(query: any) {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Number(query.limit || 20), 100);
  const skip = (page - 1) * limit;

  const where: any = { isDeleted: false };

  if (query.sourceCity)
    where.sourceCity = { contains: query.sourceCity, mode: 'insensitive' };

  if (query.destinationCity)
    where.destinationCity = {
      contains: query.destinationCity,
      mode: 'insensitive',
    };

  if (query.search) {
    where.OR = [
      { sourceCity: { contains: query.search, mode: 'insensitive' } },
      { destinationCity: { contains: query.search, mode: 'insensitive' } },
      { sourceStation: { contains: query.search, mode: 'insensitive' } },
      { destinationStation: { contains: query.search, mode: 'insensitive' } },
    ];
  }

  const [items, total] = await Promise.all([
    prisma.route.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
    }),
    prisma.route.count({ where }),
  ]);

  return {
    meta: { page, limit, total },
    items,
  };
}

export async function getRouteById(id: string) {
  const route = await prisma.route.findUnique({
    where: { id },
    include: { stops: true },
  });

  if (!route || route.isDeleted) {
    throw new AppError('Route not found', 404);
  }

  return route;
}

export async function updateRoute(id: string, dto: UpdateRouteDTO) {
  const route = await prisma.route.findUnique({ where: { id } });

  if (!route || route.isDeleted) {
    throw new AppError('Route not found', 404);
  }

  const updated = await prisma.route.update({
    where: { id },
    data: {
      sourceCity: dto.sourceCity ?? route.sourceCity,
      sourceStation: dto.sourceStation ?? route.sourceStation,
      destinationCity: dto.destinationCity ?? route.destinationCity,
      destinationStation: dto.destinationStation ?? route.destinationStation,
      distanceKm: dto.distanceKm ?? route.distanceKm,
      durationMin: dto.durationMin ?? route.durationMin,
    },
  });

  return updated;
}

export async function deleteRoute(id: string) {
  const route = await prisma.route.findUnique({ where: { id } });
  if (!route || route.isDeleted) {
    throw new AppError('Route not found', 404);
  }

  const deleted = await prisma.route.update({
    where: { id },
    data: { isDeleted: true },
  });

  return deleted;
}
