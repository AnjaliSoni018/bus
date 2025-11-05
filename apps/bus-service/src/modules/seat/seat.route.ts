import { Router } from 'express';
import * as controller from './seat.controller';
import { validate } from '../../middlewares/validation.middleware';
import {
  createSeatSchema,
  listSeatsSchema,
  updateSeatSchema,
  seatIdParamSchema,
} from './seat.validator';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validate(createSeatSchema, 'body'),
  controller.create
);
router.get('/', validate(listSeatsSchema, 'query'), controller.list);
router.get('/:id', validate(seatIdParamSchema, 'params'), controller.getById);
router.patch(
  '/:id',
  validate(updateSeatSchema, 'body'),
  authMiddleware,
  controller.update
);
router.delete(
  '/:id',
  authMiddleware,
  validate(seatIdParamSchema, 'params'),
  controller.remove
);

export default router;
