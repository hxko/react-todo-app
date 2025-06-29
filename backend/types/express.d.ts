import { ParamsDictionary } from 'express-serve-static-core';

declare global {
  namespace Express {
    interface Request {
      user?: {
        uid: string;
      };
    }
  }
}