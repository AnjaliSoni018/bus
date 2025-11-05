import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { apiResponse } from '../../utils/apiResponse';
import * as service from './tripSearch.service';

export const searchTripsController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await service.searchTrips(req.query as any);
    return apiResponse.success(res, data, 'Trips fetched successfully');
  }
);
