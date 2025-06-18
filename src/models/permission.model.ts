import { Schema, model } from 'mongoose';

import type { PermissionType } from '../@types/permission.types';
import { ROLES } from '../config/role.config';
import { permissionValueSchema } from '../schema/permission.schema';

const PermissionSchema = new Schema<PermissionType>(
  {
    name: { type: String, required: true },
    value: {
      type: Schema.Types.Mixed, // Accepts boolean OR array of objects
      required: true,

      validate: {
        validator: function (val: unknown) {
          const { error, warning } = permissionValueSchema.validate(val, {
            abortEarly: false,
          });

          if (error || warning) {
            return false;
          }

          return true;
        },
        message: `Value must be a boolean or an array of objects with "role" as ${ROLES.join(',')} array and "users" as number (1,100)`,
      },
    },
  },
  { timestamps: true }
);

const Permission = model<PermissionType>('permission', PermissionSchema);

export { Permission };
