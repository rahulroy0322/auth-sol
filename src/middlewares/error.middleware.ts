import type { ErrorRequestHandler } from 'express';

import { isDev } from '../config/env.config';
import { AppError } from '../errors/main';
import { serverError } from '../status/main';

const formatErrorData = (e: Error) => {
  const data: Error & {
    success: false;
  } = {
    success: false,
    message: e.message,
    name: e.name,
  };

  if (isDev) {
    data.stack = e.stack;
  }

  return data;
};

const errorMiddleware: ErrorRequestHandler = (e, req, res, _): void => {
  if (e instanceof AppError) {
    res.status(e.code).json(formatErrorData(e));
    return;
  }

  if (e instanceof Error) {
    res.status(serverError).json(formatErrorData(e));
    return;
  }

  const data = {
    success: false,
    message: `Some thing went wrong!`,
  } as {
    stuck?: string;
  };

  if (isDev) {
    data.stuck = `${req.url}`;
  }

  res.status(serverError).json(data);
};

export { errorMiddleware };
