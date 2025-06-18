import { Router } from 'express';

import {
  createPermissionController,
  getAllPermissionController,
  getPermissionByIdController,
  updatePermissionByIdController,
} from '../controllers/permission.controller';

const permissionRouter: Router = Router();

permissionRouter
  .route('/')
  .get(getAllPermissionController)
  .post(createPermissionController);

permissionRouter
  .route('/:id')
  .get(getPermissionByIdController)
  .patch(updatePermissionByIdController);

export { permissionRouter };
