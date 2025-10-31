import { Request, Response } from 'express';
import * as service from './bus.service';
import { apiResponse } from '../../utils/apiResponse';
import { asyncHandler } from '../../utils/asyncHandler';

export const createBus = asyncHandler(async (req: Request, res: Response) => {
  const actor = req.user as { id?: string; role?: string } | undefined;
  const created = await service.createBus(req.body, actor?.id);
  return apiResponse.success(res, created, 'Bus created', 201);
});

export const getAllBuses = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.getAllBuses(req.query);
  return apiResponse.success(res, result, 'OK');
});

export const getBusById = asyncHandler(async (req: Request, res: Response) => {
  const bus = await service.getBusById(req.params.id);
  return apiResponse.success(res, bus, 'OK');
});

export const updateBus = asyncHandler(async (req: Request, res: Response) => {
  const actor = req.user as { id?: string; role?: string } | undefined;
  const updated = await service.updateBus(req.params.id, req.body, actor);
  return apiResponse.success(res, updated, 'Bus updated');
});

export const deleteBus = asyncHandler(async (req: Request, res: Response) => {
  const actor = req.user as { id?: string; role?: string } | undefined;
  await service.softDeleteBus(req.params.id, actor);
  return apiResponse.success(res, null, 'Bus deleted');
});
