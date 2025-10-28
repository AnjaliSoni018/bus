// import { Request, Response } from 'express';
// import busService from '../services/busService';
// import { ERROR_MESSAGES } from '../constants/errorMessages';

// const createBus = async (req: Request, res: Response) => {
//   try {
//     const operatorId = req.header('x-user-id') || req.body.operatorId;
//     const payload = req.body;
//     const bus = await busService.createBus(payload, operatorId);
//     res.status(201).json({ success: true, data: bus });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, error: (err as Error)?.message || err });
//   }
// };

// const getBus = async (req: Request, res: Response) => {
//   try {
//     const bus = await busService.getBus(req.params.id);
//     if (!bus)
//       return res
//         .status(404)
//         .json({ success: false, error: ERROR_MESSAGES.NOT_FOUND });
//     res.json({ success: true, data: bus });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, error: (err as Error)?.message || err });
//   }
// };

// const updateBus = async (req: Request, res: Response) => {
//   try {
//     const operatorId = req.header('x-user-id');
//     const updated = await busService.updateBus(
//       req.params.id,
//       req.body,
//       operatorId
//     );
//     res.json({ success: true, data: updated });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, error: (err as Error)?.message || err });
//   }
// };

// const deactivateBus = async (req: Request, res: Response) => {
//   try {
//     const operatorId = req.header('x-user-id');
//     await busService.deactivateBus(req.params.id, operatorId);
//     res.json({ success: true });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, error: (err as Error)?.message || err });
//   }
// };

// const listByOperator = async (req: Request, res: Response) => {
//   try {
//     const operatorId = req.params.operatorId;
//     const list = await busService.listByOperator(operatorId);
//     res.json({ success: true, data: list });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ success: false, error: (err as Error)?.message || err });
//   }
// };

// export default {
//   createBus,
//   getBus,
//   updateBus,
//   deactivateBus,
//   listByOperator,
// };
