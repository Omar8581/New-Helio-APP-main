import { Router } from 'express';
import * as propertiesController from '../controllers/propertiesController';
import { authenticate } from '../middleware/auth';
import { validate, createPropertySchema } from '../utils/validation';

const router = Router();

router.get('/', propertiesController.getProperties);
router.get('/:id', propertiesController.getPropertyById);
router.post('/', authenticate, validate(createPropertySchema), propertiesController.createProperty);
router.put('/:id', authenticate, propertiesController.updateProperty);
router.delete('/:id', authenticate, propertiesController.deleteProperty);

export default router;
