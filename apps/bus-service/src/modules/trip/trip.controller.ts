import { Request, Response } from 'express';
import {
  createTrip,
  listTrips,
  getTripById,
  updateTrip,
  softDeleteTrip,
} from './trip.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { apiResponse } from '../../utils/apiResponse';

export const create = asyncHandler(async (req: Request, res: Response) => {
  const actor = req.user?.id;
  const created = await createTrip(req.body, actor);
  return apiResponse.success(res, created, 'Trip created', 201);
});

export const list = asyncHandler(async (req: Request, res: Response) => {
  const result = await listTrips(req.query);
  return apiResponse.success(res, result, 'OK');
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const trip = await getTripById(req.params.id);
  return apiResponse.success(res, trip, 'OK');
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const actor = req.user?.id;
  const updated = await updateTrip(req.params.id, req.body, actor);
  return apiResponse.success(res, updated, 'Trip updated');
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const actor = req.user?.id;
  const deleted = await softDeleteTrip(req.params.id, actor);
  return apiResponse.success(res, deleted, 'Trip deleted');
});
