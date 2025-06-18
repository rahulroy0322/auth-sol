import {
  _continue,
  _max,
  alreadyExist,
  badRequest,
  notFound,
  serverError,
} from '../status/main';

class AppError extends Error {
  readonly code: number;
  constructor(code: number, message: string) {
    super(message);
    if (code < _continue || code > _max) {
      code = serverError;
    }
    this.code = code;
  }
}

// 4**
class NotFoundError extends AppError {
  constructor(message: string = 'route not found') {
    super(notFound, message);
  }
}

class ValueError extends AppError {
  constructor(message: string, code = badRequest) {
    super(code, message);
  }
}

class AlreadyExistError extends AppError {
  constructor(message: string) {
    super(alreadyExist, message);
  }
}

//5**
class ServerError extends AppError {
  constructor(message: string = 'Some thing went wrong!') {
    super(serverError, message);
  }
}

export { AppError, NotFoundError, ServerError, ValueError, AlreadyExistError };
