import { Router } from 'express';
import * as controller from './bus.controller';
import { validate } from '../../middlewares/validation.middleware';
import {
  createBusSchema,
  updateBusSchema,
  listBusesSchema,
} from './bus.validators';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router: Router = Router();

router.get('/', validate(listBusesSchema, 'query'), controller.getAllBuses);
router.get('/my-buses', authMiddleware, controller.getMyBuses);
router.get('/:id', controller.getBusById);
router.post(
  '/',
  validate(createBusSchema),
  authMiddleware,
  controller.createBus
);
router.patch(
  '/:id',
  validate(updateBusSchema),
  authMiddleware,
  controller.updateBus
);
router.delete('/:id', authMiddleware, controller.deleteBus);

export default router;
