import type { RoleType } from '../config/role.config';
import type { Pritify } from './utils.types';

type UserType = {
  _id: string;
  uname: string;
  email: string;
  passwd: string;
  role: RoleType;
};

type UserPassLessType = Pritify<Omit<UserType, 'passwd'>>;

export type { UserType, UserPassLessType };
