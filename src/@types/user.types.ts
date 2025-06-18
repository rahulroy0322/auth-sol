import type { RoleType } from '../config/role.config';

type UserType = {
  _id: string;
  uname: string;
  email: string;
  pass: string;
  role: RoleType;
};

export type { UserType };
