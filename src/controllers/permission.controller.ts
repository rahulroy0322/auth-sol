import type { RequestHandler } from 'express';

import {
  AlreadyExistError,
  NotFoundError,
  ServerError,
  ValueError,
} from '../errors/main';
import { asyncHandler } from '../middlewares/async.handler';
import {
  permissionSchema,
  permissionUpdateSchema,
} from '../schema/permission.schema';
import {
  createPermission,
  getAllPermission,
  getPermissionById,
  getPermissionByName,
  updatePermissionById,
} from '../services/permission.services';
import { created, ok } from '../status/main';

const createPermissionController: RequestHandler = asyncHandler(
  async (req, res) => {
    const { value, error } = permissionSchema.validate(req.body, {
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
    const alreadyExistPertssionName = await getPermissionByName(value.name);

    if (alreadyExistPertssionName) {
      throw new AlreadyExistError(
        `Perssion already exists with this name "${value.name}"!`
      );
    }

    const permission = await createPermission(value);

    if (!permission) {
      throw new ServerError();
    }

    res.status(created).json({
      success: true,
      data: permission,
    });
  }
);

const getAllPermissionController: RequestHandler = asyncHandler(
  async (_req, res) => {
    // TODO
    const permissions = await getAllPermission();

    if (!permissions) {
      throw new NotFoundError('No perssion found!');
    }

    res.status(ok).json({
      success: true,
      data: permissions,
    });
  }
);

const getPermissionByIdController: RequestHandler = asyncHandler(
  async (req, res) => {
    const id = req.params.id!;

    // TODO
    const permission = await getPermissionById(id);

    if (!permission) {
      throw new NotFoundError('No perssion found!');
    }

    res.status(ok).json({
      success: true,
      data: permission,
    });
  }
);

const updatePermissionByIdController: RequestHandler = asyncHandler(
  async (req, res) => {
    const id = req.params.id!;

    const { value, error } = permissionUpdateSchema.validate(req.body, {
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
    const permission = await updatePermissionById(id, value);

    if (!permission) {
      throw new NotFoundError('No perssion found!');
    }

    res.status(ok).json({
      success: true,
      data: permission,
    });
  }
);

export {
  createPermissionController,
  getAllPermissionController,
  getPermissionByIdController,
  updatePermissionByIdController,
};
