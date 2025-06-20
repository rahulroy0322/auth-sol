import { Router } from 'express';

import {
  createPermissionController,
  getAllPermissionController,
  getPermissionByIdController,
  updatePermissionByIdController,
} from '../controllers/permission.controller';
import { authenticate, roleAuthenticate } from '../middlewares/auth.middleware';

const permissionRouter: Router = Router();

permissionRouter
  .route('/')
  .get(
    authenticate,
    roleAuthenticate(['admin', 'super']),
    getAllPermissionController
  )
  .post(
    authenticate,
    roleAuthenticate(['admin', 'super']),
    createPermissionController
  );

permissionRouter
  .route('/:id')
  .get(authenticate, getPermissionByIdController)
  .patch(
    authenticate,
    roleAuthenticate(['admin', 'super']),
    updatePermissionByIdController
  );

export { permissionRouter };
