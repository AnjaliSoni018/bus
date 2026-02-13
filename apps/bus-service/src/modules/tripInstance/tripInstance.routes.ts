import { Router } from 'express';
import * as controller from './tripInstance.controller';
import { validate } from '../../middlewares/validation.middleware';
import {
  holdSeatsSchema,
  tripInstanceIdParamSchema,
} from './tripInstance.validators';

const router: Router = Router();

router.get(
  '/:tripInstanceId',
  validate(tripInstanceIdParamSchema, 'params'),
  controller.getTripInstanceById
);

router.post(
  '/:tripInstanceId/hold-seats',
  validate(tripInstanceIdParamSchema, 'params'),
  validate(holdSeatsSchema, 'body'),
  controller.holdTripInstanceSeats
);

export default router;
