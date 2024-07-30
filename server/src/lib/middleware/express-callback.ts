import { Request, Response, NextFunction } from 'express';

export interface Callback {
  processRequest: (req: Request, res: Response, next: NextFunction) => void;
}
export const makeExpressCallBack =
  (callback: Callback) => (req: Request, res: Response, next: NextFunction) =>
    callback.processRequest(req, res, next);
