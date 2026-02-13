import { Request, Response } from 'express';
import { asyncHandler } from '../../utils/asyncHandler';
import { apiResponse } from '../../utils/apiResponse';
import * as service from './tripInstance.service';

export const getTripInstanceById = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await service.getTripInstanceById(req.params.tripInstanceId);

    return apiResponse.success(res, data, 'Trip instance fetched successfully');
  }
);

export const holdTripInstanceSeats = asyncHandler(
  async (req: Request, res: Response) => {
    const data = await service.holdSeats(req.params.tripInstanceId, req.body);

    return apiResponse.success(res, data, 'Seats held successfully');
  }
);
