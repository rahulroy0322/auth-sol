import type { NextFunction, Request, RequestHandler, Response } from 'express';

const asyncHandler = (
  // eslint-disable-next-line no-unused-vars
  handler: (req: Request, res: Response, next: NextFunction) => Promise<void>
): RequestHandler =>
  ((req, res, next) =>
    Promise.resolve(handler(req, res, next)).catch(next)) as RequestHandler;

export { asyncHandler };
