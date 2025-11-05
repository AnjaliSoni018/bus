import { Request, Response } from 'express';
import {
  createSeat,
  listSeats,
  getSeatById,
  updateSeat,
  softDeleteSeat,
} from './seat.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { apiResponse } from '../../utils/apiResponse';

export const create = asyncHandler(async (req: Request, res: Response) => {
  const payload = req.body;
  const created = await createSeat(payload);
  return apiResponse.success(
    res,
    created,
    'Seat(s) created',
    Array.isArray(payload) ? 201 : 201
  );
});

export const list = asyncHandler(async (req: Request, res: Response) => {
  const result = await listSeats(req.query);
  return apiResponse.success(res, result, 'OK');
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const seat = await getSeatById(req.params.id);
  return apiResponse.success(res, seat, 'OK');
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const updated = await updateSeat(req.params.id, req.body);
  return apiResponse.success(res, updated, 'Seat updated');
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const deleted = await softDeleteSeat(req.params.id);
  return apiResponse.success(res, deleted, 'Seat deleted');
});
