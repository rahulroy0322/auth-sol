import { compare } from 'bcrypt';
import type { RequestHandler } from 'express';

import {
  AlreadyExistError,
  NotFoundError,
  ServerError,
  UnauthorizedError,
  ValueError,
} from '../errors/main';
import { asyncHandler } from '../middlewares/async.handler';
import { loginSchema, registerSchema } from '../schema/auth.schema';
import { hashData } from '../services/auth.services';
import {
  createUser,
  getUserByEmail,
  getUserByUname,
} from '../services/user.services';
import { created, ok } from '../status/main';

const registerController: RequestHandler = asyncHandler(async (req, res) => {
  const { value, error } = registerSchema.validate(
    {
      ...req.body,
      role: 'user',
    },
    {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    }
  );

  if (error) {
    throw new ValueError(
      error.details.map((detail) => detail.message).join(',')
    );
  }

  // TODO
  const alreadyExistUname = await getUserByUname(value.uname);

  if (alreadyExistUname) {
    throw new AlreadyExistError(`User Name "${value.uname}" already exists!`);
  }
  const alreadyExistEmail = await getUserByEmail(value.email);

  if (alreadyExistEmail) {
    throw new AlreadyExistError(`Email "${value.email}" already exists!`);
  }

  value.passwd = await hashData(value.passwd);

  const user = await createUser(value);

  if (!user) {
    throw new ServerError();
  }

  // todo
  res.status(created).json({
    success: true,
    data: user,
  });
});

const loginController: RequestHandler = asyncHandler(async (req, res) => {
  const { value, error } = loginSchema.validate(req.body, {
    abortEarly: false,
    allowUnknown: false,
    stripUnknown: true,
  });

  if (error) {
    throw new ValueError(
      error.details.map((detail) => detail.message).join(',')
    );
  }

  // TODO
  const user = await getUserByEmail(value.email, true);

  if (!user) {
    throw new NotFoundError('invalid email or password!');
  }

  if (!(await compare(value.passwd, user.passwd))) {
    throw new UnauthorizedError('invalid email or password!');
  }

  // TODO
  res.status(ok).json({
    success: true,
    data: user,
  });
});

export { registerController, loginController };
