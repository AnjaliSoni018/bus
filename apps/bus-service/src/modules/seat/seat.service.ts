import { prisma } from '../../db/prisma';
import { AppError } from '../../utils/AppError';
import { SeatPayload } from './seat.types';

export async function createSeat(payload: SeatPayload | SeatPayload[]) {
  if (Array.isArray(payload)) {
    if (payload.length === 0) throw new AppError('Empty payload', 400);
    const templateIds = Array.from(new Set(payload.map((p) => p.templateId)));
    const templates = await prisma.seatTemplate.findMany({
      where: { id: { in: templateIds }, isDeleted: false },
      select: { id: true },
    });
    if (templates.length !== templateIds.length)
      throw new AppError('One or more seat templates not found', 404);

    const checks: string[] = [];
    for (const p of payload) {
      const key = `${p.templateId}::${p.seatNo}`;
      if (checks.includes(key))
        throw new AppError(
          `Duplicate seatNo ${p.seatNo} for template ${p.templateId} in payload`,
          400
        );
      checks.push(key);
    }
    const whereOr = payload.map((p) => ({
      templateId: p.templateId,
      seatNo: p.seatNo,
    }));
    const existing = await prisma.seat.findMany({ where: { OR: whereOr } });
    if (existing.length > 0) {
      const dup = existing.map((e) => `${e.templateId}:${e.seatNo}`).join(', ');
      throw new AppError(`Seats already exist: ${dup}`, 409);
    }

    const created = await prisma.seat.createMany({
      data: payload.map((p) => ({
        templateId: p.templateId,
        seatNo: p.seatNo,
        seatLabel: p.seatLabel ?? null,
        type: p.type ?? 'REGULAR',
        row: p.row ?? null,
        column: p.column ?? null,
        deck: p.deck ?? null,
        priceFactor: p.priceFactor ?? 1.0,
        genderOnly: p.genderOnly ?? false,
        createdAt: new Date(),
        updatedAt: new Date(),
        isDeleted: false,
      })),
      skipDuplicates: false,
    });

    return { inserted: created.count };
  }

  const template = await prisma.seatTemplate.findUnique({
    where: { id: payload.templateId },
  });
  if (!template || template.isDeleted)
    throw new AppError('SeatTemplate not found', 404);

  const existing = await prisma.seat.findFirst({
    where: { templateId: payload.templateId, seatNo: payload.seatNo },
  });
  if (existing)
    throw new AppError('Seat with same seatNo already exists in template', 409);

  const created = await prisma.seat.create({
    data: {
      templateId: payload.templateId,
      seatNo: payload.seatNo,
      seatLabel: payload.seatLabel ?? null,
      type: payload.type ?? 'REGULAR',
      row: payload.row ?? null,
      column: payload.column ?? null,
      deck: payload.deck ?? null,
      priceFactor: payload.priceFactor ?? 1.0,
      genderOnly: payload.genderOnly ?? false,
    },
  });

  return created;
}

export async function listSeats(query: any) {
  const page = Math.max(Number(query.page || 1), 1);
  const limit = Math.min(Number(query.limit || 50), 200);
  const skip = (page - 1) * limit;

  const where: any = { isDeleted: false };

  if (query.templateId) where.templateId = query.templateId;
  if (query.seatNo)
    where.seatNo = { contains: query.seatNo, mode: 'insensitive' };
  if (query.type) where.type = query.type;

  const [items, total] = await Promise.all([
    prisma.seat.findMany({
      where,
      skip,
      take: limit,
      orderBy: [{ row: 'asc' }, { column: 'asc' }, { seatNo: 'asc' }],
    }),
    prisma.seat.count({ where }),
  ]);

  return { meta: { page, limit, total }, items };
}

export async function getSeatById(id: string) {
  const seat = await prisma.seat.findUnique({
    where: { id },
    include: { template: true },
  });
  if (!seat || seat.isDeleted) throw new AppError('Seat not found', 404);
  return seat;
}
export async function updateSeat(id: string, dto: Partial<SeatPayload>) {
  const existing = await prisma.seat.findUnique({ where: { id } });
  if (!existing || existing.isDeleted)
    throw new AppError('Seat not found', 404);

  if (dto.seatNo && dto.seatNo !== existing.seatNo) {
    const dup = await prisma.seat.findFirst({
      where: { templateId: existing.templateId, seatNo: dto.seatNo },
    });
    if (dup) throw new AppError('seatNo already exists in the template', 409);
  }

  const updated = await prisma.seat.update({
    where: { id },
    data: {
      ...(dto.seatNo !== undefined && { seatNo: dto.seatNo }),
      ...(dto.seatLabel !== undefined && { seatLabel: dto.seatLabel }),
      ...(dto.type !== undefined && { type: dto.type }),
      ...(dto.row !== undefined && { row: dto.row }),
      ...(dto.column !== undefined && { column: dto.column }),
      ...(dto.deck !== undefined && { deck: dto.deck }),
      ...(dto.priceFactor !== undefined && { priceFactor: dto.priceFactor }),
      ...(dto.genderOnly !== undefined && { genderOnly: dto.genderOnly }),
      updatedAt: new Date(),
    },
  });

  return updated;
}

export async function softDeleteSeat(id: string) {
  const existing = await prisma.seat.findUnique({ where: { id } });
  if (!existing || existing.isDeleted)
    throw new AppError('Seat not found', 404);

  const deleted = await prisma.seat.update({
    where: { id },
    data: { isDeleted: true, updatedAt: new Date() },
  });

  return deleted;
}
