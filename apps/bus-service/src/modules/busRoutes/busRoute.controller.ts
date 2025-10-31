import { Request, Response } from 'express';
import {
  createBusRoute,
  listBusRoutes,
  getBusRouteById,
  updateBusRoute,
  softDeleteBusRoute,
} from './busRoute.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { apiResponse } from '../../utils/apiResponse';

export const create = asyncHandler(async (req: Request, res: Response) => {
  const actor = req.user?.id;
  const payload = req.body;
  const created = await createBusRoute(payload, actor);
  return apiResponse.success(res, created, 'BusRoute created', 201);
});

export const list = asyncHandler(async (req: Request, res: Response) => {
  const result = await listBusRoutes(req.query);
  return apiResponse.success(res, result, 'OK');
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const record = await getBusRouteById(req.params.id);
  return apiResponse.success(res, record, 'OK');
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const actor = req.user?.id;
  const updated = await updateBusRoute(req.params.id, req.body, actor);
  return apiResponse.success(res, updated, 'BusRoute updated');
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  const actor = req.user?.id;
  const deleted = await softDeleteBusRoute(req.params.id, actor);
  return apiResponse.success(res, deleted, 'BusRoute deleted');
});
