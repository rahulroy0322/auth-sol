import { Router } from 'express';

import { permissionRouter } from './permission.route';

const apiRouter: Router = Router();

apiRouter.use('/permission', permissionRouter);

export { apiRouter };
