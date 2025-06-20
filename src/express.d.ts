import type { UserPassLessType } from './@types/user.types';

declare global {
  namespace Express {
    interface Request {
      user?: UserPassLessType;
    }
  }
}
