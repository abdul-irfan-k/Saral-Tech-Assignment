import jwt, { VerifyErrors } from 'jsonwebtoken';
import { Request } from 'express';
import {
  userJWTAcessTokenSecret,
  userJWTRefreshTokenSecret,
} from '../constant/constant';

interface createJwtTokenHandlerArgument {
  _id: string;
  email: string;
  expiresIn: '1h' | '1 days' | '7 days';
  tokenType: 'refreshToken' | 'accessToken';
  tokenScope: 'user';
}

interface createJwtTokenHandlerReturnType {
  isValid: boolean;
  token: string;
  error?: string;
}

export const createJwtTokenHandler = async ({
  _id,
  email,
  expiresIn,
  tokenType,
  tokenScope,
}: createJwtTokenHandlerArgument): Promise<createJwtTokenHandlerReturnType> => {
  return new Promise((resolve, reject) => {
    const accessToken = userJWTAcessTokenSecret;
    const refreshToekn = userJWTRefreshTokenSecret;
    const tokenSecret = tokenType == 'accessToken' ? accessToken : refreshToekn;

    jwt.sign(
      { email, _id },
      tokenSecret || '',
      { expiresIn },
      //@ts-ignore
      (error, token) => {
        if (typeof token === 'string') resolve({ isValid: true, token });
        if (typeof error !== 'undefined')
          reject({ isValid: false, error: error?.name });
      },
    );
  });
};

interface verifyJwtTokenHandlerArgument {
  req: Request;
  token: string;
  tokenType: 'refreshToken' | 'accessToken';
  tokenScope: 'user';
}

interface verifyJwtTokenHandlerReturnType {
  isValid: boolean;
  error?: string;
}
export const verifyJwtTokenHandler = ({
  req,
  token,
  tokenType,
  tokenScope,
}: verifyJwtTokenHandlerArgument): Promise<verifyJwtTokenHandlerReturnType> => {
  return new Promise((resolve, reject) => {
    const accessToken = userJWTAcessTokenSecret;
    const refreshToekn = userJWTRefreshTokenSecret;
    const tokenSecret = tokenType == 'accessToken' ? accessToken : refreshToekn;

    //@ts-ignore
    jwt.verify(token, tokenSecret || '', (err, decoded) => {
      if (!err && decoded && typeof decoded !== 'string') {
        //@ts-ignore
        req.user = { _id: decoded._id, email: decoded.email };
        return resolve({ isValid: true });
      }

      if (err as VerifyErrors) {
        reject({ isValid: false, error: err });
      }
      return reject({ isValid: false, error: 'not found' });
    });
  });
};
