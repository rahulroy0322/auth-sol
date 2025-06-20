import Joi from 'joi';

import type { UserType } from '../@types/user.types';
import { Pritify } from '../@types/utils.types';
import { emailSchema, passwordSchema, userSchema } from './user.schema';

const loginSchema = Joi.object<Pritify<Pick<UserType, 'email' | 'passwd'>>>({
  email: emailSchema.required(),
  passwd: passwordSchema.required(),
});

const registerSchema = userSchema;

export { loginSchema, registerSchema };
