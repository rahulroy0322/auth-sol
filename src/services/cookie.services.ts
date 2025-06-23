import type { Response } from 'express';

import type { UserPassLessType } from '../@types/user.types';
import { ACCESS_KEY, REFRESH_KEY } from '../config/cookie.config';
import { isDev } from '../config/env.config';
import { createToken } from './auth.services';

const milisecond = 1000;
const minutes = 60;
const quater = 25;
const day = 24;
const week = 7;

const setCookie = (
  res: Response,
  name: string,
  data: string,
  {
    httpOnly,
    maxAge,
  }: {
    httpOnly: boolean;
    maxAge: number;
  }
) =>
  res.cookie(name, data, {
    sameSite: 'none',
    secure: !isDev,
    maxAge,
    httpOnly,
  });

const setCookies = (res: Response, user: UserPassLessType) => {
  setCookie(
    res,
    REFRESH_KEY,
    `Bearer ${createToken(
      {
        _id: user._id,
      },
      {
        expiresIn: '7days',
      }
    )}`,
    {
      httpOnly: true,
      maxAge: milisecond * minutes * minutes * day * week,
    }
  );
  setCookie(
    res,
    ACCESS_KEY,
    `Bearer ${createToken(
      {
        _id: user._id,
        email: user.email,
        uname: user.uname,
        role: user.role,
      },
      {
        expiresIn: '15 minutes',
      }
    )}`,
    {
      httpOnly: true,
      maxAge: milisecond * minutes * minutes * quater,
    }
  );
};

const cookieRes = (res: Response, user: UserPassLessType, status: number) => {
  setCookies(res, user);
  res.status(status).json({
    success: true,
    data: user,
  });
};

export { setCookies, cookieRes };
