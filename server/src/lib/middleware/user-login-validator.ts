import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../util/bad-request-error';
import jwt from 'jsonwebtoken';
import { userJWTAcessTokenSecret } from '@lib/constant/constant';

export const isUserAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { accessToken, refreshToken } = req.cookies || {};
  if (!accessToken || !refreshToken)
    throw new BadRequestError({ code: 400, message: 'token is required' });
  const isCutomAuth = accessToken?.length < 500;

  if (accessToken && isCutomAuth) {
    //@ts-ignore
    jwt.verify(accessToken, userJWTAcessTokenSecret, (error, decoded) => {
      if (!error) {
        //@ts-ignore
        req.user = { _id: decoded._id, email: decoded.email };
        return next();
      }
      throw new BadRequestError({
        code: 403,
        message: 'User access token expired',
      });
    });
  } else throw new BadRequestError({ code: 400, message: 'token required' });
};
