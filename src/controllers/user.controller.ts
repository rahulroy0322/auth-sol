import type { RequestHandler } from 'express';

import {
  AlreadyExistError,
  NotFoundError,
  ServerError,
  ValueError,
} from '../errors/main';
import { asyncHandler } from '../middlewares/async.handler';
import { userSchema, userUpdateSchema } from '../schema/user.schema';
import {
  createUser,
  getAllUser,
  getUserByEmail,
  getUserById,
  getUserByUname,
  updateUserById,
} from '../services/user.services';
import { created, ok } from '../status/main';

const createUserController: RequestHandler = asyncHandler(async (req, res) => {
  const { value, error } = userSchema.validate(req.body, {
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
  const alreadyExistUname = await getUserByUname(value.uname);

  if (alreadyExistUname) {
    throw new AlreadyExistError(`User Name "${value.uname}" already exists!`);
  }
  const alreadyExistEmail = await getUserByEmail(value.email);

  if (alreadyExistEmail) {
    throw new AlreadyExistError(`Email "${value.email}" already exists!`);
  }

  const user = await createUser(value);

  if (!user) {
    throw new ServerError();
  }

  res.status(created).json({
    success: true,
    data: user,
  });
});

const getAllUserController: RequestHandler = asyncHandler(async (_req, res) => {
  // TODO
  const users = await getAllUser();

  if (!users) {
    throw new NotFoundError('No User found!');
  }

  res.status(ok).json({
    success: true,
    data: users,
  });
});

const getUserByIdController: RequestHandler = asyncHandler(async (req, res) => {
  const id = req.params.id!;

  // TODO
  const user = await getUserById(id);

  if (!user) {
    throw new NotFoundError('No User found!');
  }

  res.status(ok).json({
    success: true,
    data: user,
  });
});

const updateUserByIdController: RequestHandler = asyncHandler(
  async (req, res) => {
    const id = req.params.id!;

    const { value, error } = userUpdateSchema.validate(req.body, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: true,
    });

    if (error) {
      throw new ValueError(
        error.details.map((detail) => detail.message).join(',')
      );
    }

    if (!value) {
      throw new ValueError('please peovide something to update!');
    }

    // TODO
    const user = await updateUserById(id, value);

    if (!user) {
      throw new NotFoundError('No User found!');
    }

    res.status(ok).json({
      success: true,
      data: user,
    });
  }
);

export {
  createUserController,
  getAllUserController,
  getUserByIdController,
  updateUserByIdController,
};
