import { Request, Response } from 'express';
import {
  createTripStop,
  listTripStops,
  getTripStopById,
  updateTripStop,
  deleteTripStop,
} from './tripStop.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { apiResponse } from '../../utils/apiResponse';

export const create = asyncHandler(async (req: Request, res: Response) => {
  const created = await createTripStop(req.body);
  return apiResponse.success(
    res,
    created,
    'Trip stop created successfully',
    201
  );
});

export const list = asyncHandler(async (req: Request, res: Response) => {
  const { tripId } = req.query;
  const result = await listTripStops(tripId as string);
  return apiResponse.success(res, result, 'Trip stops fetched successfully');
});

export const getById = asyncHandler(async (req: Request, res: Response) => {
  const result = await getTripStopById(req.params.id);
  return apiResponse.success(
    res,
    result,
    'Trip stop details fetched successfully'
  );
});

export const update = asyncHandler(async (req: Request, res: Response) => {
  const updated = await updateTripStop(req.params.id, req.body);
  return apiResponse.success(res, updated, 'Trip stop updated successfully');
});

export const remove = asyncHandler(async (req: Request, res: Response) => {
  await deleteTripStop(req.params.id);
  return apiResponse.success(res, null, 'Trip stop deleted successfully');
});
