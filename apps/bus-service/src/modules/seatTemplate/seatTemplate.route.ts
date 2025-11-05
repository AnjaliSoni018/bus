import { Router } from 'express';
import * as controller from './seatTemplate.controller';
import { validate } from '../../middlewares/validation.middleware';
import {
  createSeatTemplateSchema,
  updateSeatTemplateSchema,
  listSeatTemplateSchema,
} from './seatTemplate.validators';
import { authMiddleware } from '../../middlewares/auth.middleware';

const router = Router();

router.post(
  '/',
  authMiddleware,
  validate(createSeatTemplateSchema),
  controller.createSeatTemplate
);
router.get(
  '/',
  validate(listSeatTemplateSchema, 'query'),
  controller.getAllSeatTemplates
);
router.get('/:id', controller.getSeatTemplateById);
router.patch(
  '/:id',
  authMiddleware,
  validate(updateSeatTemplateSchema),
  controller.updateSeatTemplate
);
router.delete('/:id', authMiddleware, controller.deleteSeatTemplate);

export default router;
