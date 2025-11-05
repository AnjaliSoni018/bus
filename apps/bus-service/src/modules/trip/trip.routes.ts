import { Router } from 'express';
import * as controller from './trip.controller';
import { validate } from '../../middlewares/validation.middleware';
import {
  createTripSchema,
  updateTripSchema,
  listTripsSchema,
  tripIdParamSchema,
} from './trip.validator';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', validate(listTripsSchema, 'query'), controller.list);
router.get('/:id', validate(tripIdParamSchema, 'params'), controller.getById);
router.post(
  '/',
  authMiddleware,
  validate(createTripSchema, 'body'),
  controller.create
);
router.patch(
  '/:id',
  authMiddleware,
  validate(tripIdParamSchema, 'params'),
  validate(updateTripSchema, 'body'),
  controller.update
);
router.delete(
  '/:id',
  authMiddleware,
  validate(tripIdParamSchema, 'params'),
  controller.remove
);

export default router;
