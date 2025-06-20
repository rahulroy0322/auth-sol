import { Router } from 'express';

import {
  createUserController,
  getAllUserController,
  getUserByIdController,
  updateUserByIdController,
} from '../controllers/user.controller';
import { authenticate, roleAuthenticate } from '../middlewares/auth.middleware';

const userRouter: Router = Router();

userRouter
  .route('/')
  .get(authenticate, roleAuthenticate(['admin', 'super']), getAllUserController)
  .post(
    authenticate,
    roleAuthenticate(['admin', 'super']),
    createUserController
  );

userRouter
  .route('/:id')
  .get(authenticate, getUserByIdController)
  .patch(
    authenticate,
    roleAuthenticate(['admin', 'super']),
    updateUserByIdController
  );

export { userRouter };
