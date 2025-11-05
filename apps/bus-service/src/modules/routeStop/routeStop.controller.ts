import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import * as service from './routeStop.services';
import { apiResponse } from '../../utils/apiResponse';

export const createRouteStop = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await service.createRouteStop(req.body);
    return apiResponse.success(res, result, 'Route stop created', 201);
  }
);

export const getAllRouteStops = asyncHandler(
  async (req: Request, res: Response) => {
    const { routeId } = req.query;
    const result = await service.getAllRouteStops(routeId as string);
    return apiResponse.success(res, result, 'Route stops fetched');
  }
);

export const getRouteStopById = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await service.getRouteStopById(req.params.id);
    return apiResponse.success(res, result, 'Route stop fetched');
  }
);

export const updateRouteStop = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await service.updateRouteStop(req.params.id, req.body);
    return apiResponse.success(res, result, 'Route stop updated');
  }
);

export const deleteRouteStop = asyncHandler(
  async (req: Request, res: Response) => {
    const result = await service.deleteRouteStop(req.params.id);
    return apiResponse.success(res, result, 'Route stop deleted');
  }
);
