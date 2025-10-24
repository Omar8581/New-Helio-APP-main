import { Router } from 'express';
import * as newsController from '../controllers/newsController';
import { authenticate, requireAdmin } from '../middleware/auth';

const router = Router();

router.get('/', newsController.getNews);
router.get('/:id', newsController.getNewsById);
router.post('/', authenticate, requireAdmin, newsController.createNews);
router.put('/:id', authenticate, requireAdmin, newsController.updateNews);
router.delete('/:id', authenticate, requireAdmin, newsController.deleteNews);

export default router;
