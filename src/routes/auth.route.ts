import { Router } from 'express';

import {
  loginController,
  refreshTokenController,
  registerController,
} from '../controllers/auth.controller';

const authRouter: Router = Router();

authRouter.post('/login', loginController);

authRouter.post('/register', registerController);
authRouter.get('/refresh', refreshTokenController);

export { authRouter };
