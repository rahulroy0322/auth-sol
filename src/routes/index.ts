import { Router } from 'express';

import { authRouter } from './auth.route';
import { permissionRouter } from './permission.route';
import { userRouter } from './user.route';

const apiRouter: Router = Router();

apiRouter.use('/permission', permissionRouter);
apiRouter.use('/user', userRouter);
apiRouter.use('/auth', authRouter);

export { apiRouter };
