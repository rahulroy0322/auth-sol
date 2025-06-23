/* eslint-disable no-magic-numbers */
import Joi from 'joi';

import type {
  PermissionType,
  PermissionValueType,
} from '../@types/permission.types';
import { ROLES } from '../config/role.config';

const users = Joi.number().min(1).max(100);
const roles = Joi.array().items(Joi.string().valid(...ROLES));

const permissionValueSchema = Joi.alternatives<boolean | PermissionValueType[]>(
  Joi.bool(),
  Joi.array().items(
    Joi.alternatives(
      Joi.object({
        users: users.optional(),
        roles: roles.optional(),
      }),
      Joi.object({
        users: users.required(),
        roles: roles.required(),
      })
    )
  )
).messages({
  'alternatives.types': `Value must be a boolean or an array of objects with "role" as ${ROLES.join(',')} array and "users" as number (1,100)`,
});

const nameSchema = Joi.string().trim();
const permissionSchema = Joi.object<PermissionType>({
  name: nameSchema.required(),
  value: permissionValueSchema.required(),
});

const permissionUpdateSchema = Joi.object<PermissionType>({
  name: nameSchema,
  value: permissionValueSchema.required(),
});

const permissionNameSchema = nameSchema.required().messages({
  'string.empty': 'Name is required',
  'any.required': 'Name is required',
});

export {
  permissionNameSchema,
  permissionValueSchema,
  permissionSchema,
  permissionUpdateSchema,
};
