import type { UserType } from '../@types/user.types';
import type { Pritify } from '../@types/utils.types';
import { User } from '../models/user.model';

type _UserType = Pritify<
  {
    _id: string;
  } & UserType
>;

const createUser = (user: UserType) =>
  User.create(user) as unknown as Promise<_UserType>;

const getAllUser = () => User.find() as unknown as Promise<_UserType[]>;

const getUserById = (id: string) =>
  User.findById(id) as unknown as Promise<_UserType>;

const getUserByUname = (uname: string) =>
  User.findOne({
    uname,
  }) as unknown as Promise<_UserType>;

const getUserByEmail = (email: string, passwd = false) =>
  User.findOne(
    {
      email,
    },
    {
      passwd,
    }
  ) as unknown as Promise<_UserType>;

const updateUserById = (id: string, data: Partial<UserType>) =>
  User.findByIdAndUpdate(id, data, {
    new: true,
  }) as unknown as Promise<_UserType>;

export {
  createUser,
  updateUserById,
  getAllUser,
  getUserByEmail,
  getUserById,
  getUserByUname,
};
