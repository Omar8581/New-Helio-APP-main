import { Router } from 'express';
import * as advertisementsController from '../controllers/advertisementsController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', advertisementsController.getAdvertisements);
router.get('/:id', advertisementsController.getAdvertisementsById);
router.post('/', authenticate, requireAdmin, advertisementsController.createAdvertisements);
router.put('/:id', authenticate, requireAdmin, advertisementsController.updateAdvertisements);
router.delete('/:id', authenticate, requireAdmin, advertisementsController.deleteAdvertisements);

export default router;
