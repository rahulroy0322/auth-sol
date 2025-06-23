import { compare, hash } from 'bcrypt';
import jwt, { type SignOptions } from 'jsonwebtoken';

import type { UserPassLessType } from '../@types/user.types';
import { JWT_SECRET } from '../config/env.config';

const soltRound = 8;
const hashData = (data: string) => hash(data, soltRound);
const compareData = (data: string, hashData: string) => compare(data, hashData);

const createToken = (data: Partial<UserPassLessType>, options: SignOptions) =>
  jwt.sign(data, JWT_SECRET, options);

const verifyToken = (data: string) => {
  try {
    return {
      data: jwt.verify(data, JWT_SECRET) as UserPassLessType,
    };
  } catch (e) {
    return {
      error: e as Error,
    };
  }
};

export { hashData, compareData, createToken, verifyToken };
