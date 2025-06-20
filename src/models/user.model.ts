import { Schema, model } from 'mongoose';

import type { UserType } from '../@types/user.types';
import { ROLES } from '../config/role.config';

const UserSchema = new Schema<UserType>(
  {
    uname: {
      type: String,
      unique: true,
      require: true,
    },
    email: {
      type: String,
      unique: true,
      require: true,
    },
    passwd: {
      type: String,
      select: false,
      require: true,
    },
    role: {
      type: String,
      enum: ROLES,
      default: 'user',
    },
  },
  {
    timestamps: true,
  }
);

const User = model<UserType>('user', UserSchema);

export { User };
