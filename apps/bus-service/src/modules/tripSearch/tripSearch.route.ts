import { Router } from 'express';
import { validate } from '../../middlewares/validation.middleware';
import { tripSearchSchema } from './tripService.validator';
import * as controller from './tripSearch.controller';

const router: Router = Router();

router.get(
  '/trips',
  validate(tripSearchSchema, 'query'),
  controller.searchTripsController
);

export default router;
