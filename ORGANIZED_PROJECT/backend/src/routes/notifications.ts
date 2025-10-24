import { Router } from 'express';
import * as notificationsController from '../controllers/notificationsController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', notificationsController.getNotifications);
router.get('/:id', notificationsController.getNotificationsById);
router.post('/', authenticate, requireAdmin, notificationsController.createNotifications);
router.put('/:id', authenticate, requireAdmin, notificationsController.updateNotifications);
router.delete('/:id', authenticate, requireAdmin, notificationsController.deleteNotifications);

export default router;
