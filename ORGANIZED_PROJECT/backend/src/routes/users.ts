import { Router } from 'express';
import * as usersController from '../controllers/usersController';
import { authenticate, requireAdmin } from '../middleware/auth';
import { validate, updateProfileSchema } from '../utils/validation';

const router = Router();

router.get('/', authenticate, requireAdmin, usersController.getUsers);
router.get('/:id', authenticate, usersController.getUserById);
router.put('/:id', authenticate, validate(updateProfileSchema), usersController.updateUser);
router.delete('/:id', authenticate, requireAdmin, usersController.deleteUser);
router.post('/:id/request-deletion', authenticate, usersController.requestDeletion);
router.put('/:id/role', authenticate, requireAdmin, usersController.updateUserRole);
router.get('/:id/favorites', authenticate, usersController.getUserFavorites);

export default router;
