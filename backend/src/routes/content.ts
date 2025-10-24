import { Router } from 'express';
import * as contentController from '../controllers/contentController';
import { authenticate, requireAdmin } from '../middleware/auth';
const router = Router();
router.get('/:page', contentController.getContentById);
router.put('/:page', authenticate, requireAdmin, contentController.updateContent);
export default router;
