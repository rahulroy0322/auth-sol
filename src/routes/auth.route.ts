import { Router } from 'express';

import {
  loginController,
  registerController,
} from '../controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post('/login', loginController);

authRouter.post('/register', registerController);

export { authRouter };
