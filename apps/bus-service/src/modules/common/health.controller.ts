import { Request, Response } from 'express';

export const healthCheck = (req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    service: 'bus-service',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
  });
};
