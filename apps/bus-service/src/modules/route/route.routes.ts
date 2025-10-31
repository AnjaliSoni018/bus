import { Router } from 'express';
import * as controller from './route.controller';
import { validate } from '../../middlewares/validation.middleware';
import {
  createRouteSchema,
  updateRouteSchema,
  listRoutesSchema,
} from './route.validators';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.get('/', validate(listRoutesSchema, 'query'), controller.getAllRoutes);
router.get('/:id', controller.getRouteById);
router.post(
  '/',
  authMiddleware,
  validate(createRouteSchema),
  controller.createRoute
);
router.patch(
  '/:id',
  authMiddleware,
  validate(updateRouteSchema),
  controller.updateRoute
);
router.delete('/:id', authMiddleware, controller.deleteRoute);

export default router;
