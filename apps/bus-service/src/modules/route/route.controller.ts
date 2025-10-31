import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import * as service from './route.service';
import { apiResponse } from '../../utils/apiResponse';

export const createRoute = asyncHandler(async (req: Request, res: Response) => {
  const created = await service.createRoute(req.body);
  return apiResponse.success(res, created, 'Route created successfully', 201);
});

export const getAllRoutes = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await service.getAllRoutes(req.query);
    return apiResponse.success(res, result, 'Routes fetched successfully');
  }
);

export const getRouteById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await service.getRouteById(req.params.id);
    return apiResponse.success(res, result, 'Route fetched successfully');
  }
);

export const updateRoute = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.updateRoute(req.params.id, req.body);
  return apiResponse.success(res, result, 'Route updated successfully');
});

export const deleteRoute = asyncHandler(async (req: Request, res: Response) => {
  const result = await service.deleteRoute(req.params.id);
  return apiResponse.success(res, result, 'Route deleted successfully');
});
