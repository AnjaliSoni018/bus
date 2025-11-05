import { Request, Response } from 'express';
import * as service from './seatTemplate.service';
import { asyncHandler } from '../../utils/asyncHandler';
import { apiResponse } from '../../utils/apiResponse';

export const createSeatTemplate = asyncHandler(
  async (req: Request, res: Response) => {
    const created = await service.createSeatTemplate(req.body);
    return apiResponse.success(res, created, 'Seat template created', 201);
  }
);

export const getAllSeatTemplates = asyncHandler(
  async (req: Request, res: Response) => {
    const { search } = req.query as { search?: string };
    const templates = await service.getAllSeatTemplates(search);
    return apiResponse.success(res, templates, 'Seat templates fetched');
  }
);

export const getSeatTemplateById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const template = await service.getSeatTemplateById(id);
    return apiResponse.success(res, template, 'Seat template fetched');
  }
);

export const updateSeatTemplate = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const updated = await service.updateSeatTemplate(id, req.body);
    return apiResponse.success(res, updated, 'Seat template updated');
  }
);

export const deleteSeatTemplate = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const deleted = await service.deleteSeatTemplate(id);
    return apiResponse.success(res, deleted, 'Seat template deleted');
  }
);
