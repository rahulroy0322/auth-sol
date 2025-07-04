import type { RoleType } from '../config/role.config';

type PermissionValueType = {
  roles: RoleType[];
  users: number;
};

type PermissionType = {
  name: string;
  value: PermissionValueType[] | Partial<PermissionValueType>[] | boolean;
};

export type { PermissionValueType, PermissionType };
