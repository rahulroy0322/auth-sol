import type { PermissionType } from '../@types/permission.types';
import type { Pritify } from '../@types/utils.types';
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

export {
  createPermission,
  getAllPermission,
  getPermissionById,
  getPermissionByName,
  updatePermissionById,
};
