import { Router } from 'express';
import * as controller from './busRoute.controller';
import { validate } from '../../middlewares/validation.middleware';
import {
  createBusRouteSchema,
  updateBusRouteSchema,
  busRouteIdParamSchema,
} from './busRoute.validators';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.post(
  '/',
  authMiddleware,
  validate(createBusRouteSchema, 'body'),
  controller.create
);
router.get('/', controller.list);
router.get(
  '/:id',
  validate(busRouteIdParamSchema, 'params'),
  controller.getById
);
router.patch(
  '/:id',
  authMiddleware,
  validate(busRouteIdParamSchema, 'params'),
  validate(updateBusRouteSchema, 'body'),
  controller.update
);
router.delete(
  '/:id',
  authMiddleware,
  validate(busRouteIdParamSchema, 'params'),
  controller.remove
);

export default router;
