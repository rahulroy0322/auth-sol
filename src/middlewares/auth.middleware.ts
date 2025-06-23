import type { RequestHandler } from 'express';

import { ACCESS_KEY, REFRESH_KEY } from '../config/cookie.config';
import type { RoleType } from '../config/role.config';
import { debug } from '../debug';
import { ForbiddenError, ServerError, UnauthorizedError } from '../errors/main';
import { verifyToken } from '../services/auth.services';
import { setCookies } from '../services/cookie.services';
import { getUserById } from '../services/user.services';
import { asyncHandler } from './async.handler';

const authenticate: RequestHandler = asyncHandler(async (req, res, next) => {
  const [, token] = (
    req.cookies[ACCESS_KEY] ||
    req.headers.authorization ||
    req.headers.Authorization ||
    req.headers['x-authorization'] ||
    ('' as string)
  ).split(' ') as string[];

  if (!token) {
    const [, refToken] = (req.cookies[REFRESH_KEY] || '').split(' ');

    if (!refToken) {
      throw new UnauthorizedError('please login first!');
    }

    const { error, data } = verifyToken(refToken);

    if (error) {
      debug('ERROR!: ', error);
      throw new UnauthorizedError('please login first!');
    }

    if (!data) {
      debug('WARN!: ', 'data is empty this should not called');
      throw new ServerError();
    }

    // TODO
    const user = await getUserById(data._id);

    if (!user) {
      debug('ERROR!: ', 'user is empty this should not called');
      throw new ServerError();
    }

    req.user = data;

    // TODO
    setCookies(res, user);
    return next();
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
});

const roleAuthenticate: (_roles: RoleType[]) => RequestHandler =
  (roles: RoleType[]) => (req, _res, next) => {
    const user = req.user;
    if (!user) {
      debug('WARN!: ', 'user is empty this should not called');
      throw new ServerError();
    }

    if (!roles.includes(user.role)) {
      throw new ForbiddenError('you have not permission to do this!');
    }

    next();
  };

export { authenticate, roleAuthenticate };
