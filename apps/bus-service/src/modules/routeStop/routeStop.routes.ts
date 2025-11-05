import { Router } from 'express';
import * as controller from './routeStop.controller';
import { validate } from '../../middlewares/validation.middleware';
import {
  createRouteStopSchema,
  updateRouteStopSchema,
  listRouteStopsSchema,
} from './routeStop.validators';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get(
  '/',
  validate(listRouteStopsSchema, 'query'),
  controller.getAllRouteStops
);
router.get('/:id', controller.getRouteStopById);
router.post(
  '/',
  validate(createRouteStopSchema),
  authMiddleware,
  controller.createRouteStop
);
router.patch(
  '/:id',
  validate(updateRouteStopSchema),
  authMiddleware,
  controller.updateRouteStop
);
router.delete('/:id', authMiddleware, controller.deleteRouteStop);

export default router;
