import { Router } from 'express';
import * as servicesController from '../controllers/servicesController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { validate, createServiceSchema, createReviewSchema } from '../utils/validation';

const router = Router();

router.get('/categories', servicesController.getCategories);
router.get('/', servicesController.getServices);
router.get('/:id', servicesController.getServiceById);

router.post('/', authenticate, validate(createServiceSchema), servicesController.createService);
router.put('/:id', authenticate, servicesController.updateService);
router.delete('/:id', authenticate, requireAdmin, servicesController.deleteService);

router.post('/:id/reviews', authenticate, validate(createReviewSchema), servicesController.addReview);
router.put('/:serviceId/reviews/:reviewId', authenticate, servicesController.updateReview);
router.delete('/:serviceId/reviews/:reviewId', authenticate, servicesController.deleteReview);
router.post('/:serviceId/reviews/:reviewId/reply', authenticate, requireAdmin, servicesController.replyToReview);

export default router;
