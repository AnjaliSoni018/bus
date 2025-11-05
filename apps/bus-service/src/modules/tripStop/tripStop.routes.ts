import { Router } from 'express';
import * as controller from './tripStop.controller';
import { validate } from '../../middlewares/validation.middleware';
import { authMiddleware } from '../../middlewares/auth.middleware';
import {
  createTripStopSchema,
  listTripStopsSchema,
  updateTripStopSchema,
} from './tripStop.validator';

const router = Router();

router.get('/', validate(listTripStopsSchema, 'query'), controller.list);
router.get('/:id', controller.getById);
router.post(
  '/',
  authMiddleware,
  validate(createTripStopSchema),
  controller.create
);
router.patch(
  '/:id',
  authMiddleware,
  validate(updateTripStopSchema),
  controller.update
);
router.delete('/:id', authMiddleware, controller.remove);

export default router;
