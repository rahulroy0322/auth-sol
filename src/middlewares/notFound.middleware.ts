import type { RequestHandler } from 'express';

import { NotFoundError } from '../errors/main';

const notFoundMiddleware: RequestHandler = (req): never => {
  throw new NotFoundError(`route "${req.url}" not found`);
};

export { notFoundMiddleware };
