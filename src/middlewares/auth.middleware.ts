import type { RequestHandler } from 'express';

import type { RoleType } from '../config/role.config';
import { debug } from '../debug';
import { ForbiddenError, ServerError, UnauthorizedError } from '../errors/main';
import { verifyToken } from '../services/auth.services';

const authenticate: RequestHandler = (req, _res, next) => {
  const [, token] = (
    req.cookies.authenticate ||
    req.headers.authorization ||
    req.headers.Authorization ||
    req.headers['x-authorization'] ||
    ('' as string)
  ).split(' ') as string[];

  if (!token) {
    throw new UnauthorizedError('please login first!');
  }

  const { error, data } = verifyToken(token);

  if (error) {
    debug('ERROR!: ', error);
    throw new UnauthorizedError('please login first!');
  }

  if (!data) {
    debug('WARN!: ', 'data is empty this should not called');
    throw new ServerError();
  }

  // TODO
  // ? check redis for conformation
  req.user = data;

  next();
};

const roleAuthenticate: (_roles: RoleType[]) => RequestHandler =
  (roles: RoleType[]) => (req, _res, next) => {
    const user = req.user;
    if (!user) {
      debug('WARN!: ', 'data is empty this should not called');
      throw new ServerError();
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenError('you have not permission to do this!');
    }

    next();
  };

export { authenticate, roleAuthenticate };
