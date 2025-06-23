import { v3 as murmurhash } from 'murmurhash';

import type {
  PermissionType,
  PermissionValueType,
} from '../@types/permission.types';
import type { UserPassLessType } from '../@types/user.types';
import type { Pritify } from '../@types/utils.types';
import type { RoleType } from '../config/role.config';
import { Permission } from '../models/permission.model';

type _PermissionType = Pritify<
  {
    _id: string;
  } & PermissionType
>;

const createPermission = (permission: PermissionType) =>
  Permission.create(permission) as unknown as Promise<_PermissionType>;

const getAllPermission = () =>
  Permission.find() as unknown as Promise<_PermissionType[]>;

const getPermissionById = (id: string) =>
  Permission.findById(id) as unknown as Promise<_PermissionType>;

const getPermissionByName = (name: string) =>
  Permission.findOne({
    name,
  }) as unknown as Promise<_PermissionType>;

const updatePermissionById = (id: string, data: Partial<PermissionType>) =>
  Permission.findByIdAndUpdate(id, data, {
    new: true,
  }) as unknown as Promise<_PermissionType>;

const checkRole = (
  allowedRoles: RoleType[] | undefined,
  userRole: RoleType
): boolean => {
  if (!allowedRoles) {
    return false;
  }
  return allowedRoles.includes(userRole);
};

//! DONT TOUCH IT
const MAX_UINT_32 = 4294967295;

const checkPercentage = (
  permissionName: string,
  percent: number | undefined,
  userId: string
): boolean => {
  if (!percent) {
    return true;
  }
  /* eslint-disable no-magic-numbers */
  if (percent > 1) {
    percent = percent / 100;
  }
  /* eslint-enable no-magic-numbers */
  return murmurhash(`${permissionName}-${userId}`) / MAX_UINT_32 < percent;
};

const checkRule = (
  { roles, users }: Partial<PermissionValueType>,
  name: string,
  user: UserPassLessType
): boolean =>
  checkRole(roles, user.role) && checkPercentage(name, users, user._id);

const checkPermission = (
  permission: _PermissionType,
  user: UserPassLessType
): boolean => {
  const { value, name } = permission;
  if (typeof value === 'boolean') {
    return value;
  }
  return value.some((rule) => checkRule(rule, name, user));
};

export {
  createPermission,
  getAllPermission,
  getPermissionById,
  getPermissionByName,
  updatePermissionById,
  checkPermission,
};
