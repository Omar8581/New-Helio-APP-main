import { Router } from 'express';
import * as uploadController from '../controllers/uploadController';
import { authenticate } from '../middleware/auth';
const router = Router();
router.post('/', authenticate, uploadController.uploadImages);
export default router;
