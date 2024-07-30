import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { ISignInWithGoogleUseCase } from '@lib/use-case/interface/user';
import { BadRequestError } from '@lib/util/bad-request-error';
import { createJwtTokenHandler } from '@lib/util/jsonwebtoken';

export class PostSignInWithGoogleController {
  constructor(private signInWithGoogleUseCase: ISignInWithGoogleUseCase) {}
  async processRequest(req: Request, res: Response, next: NextFunction) {
    console.log('req body', req.body);
    const { acessToken: token } = req.body;
    const userDetail = await this.signInWithGoogleUseCase.execute({
      accessToken: token,
    });
    if (userDetail == null)
      throw new BadRequestError({ code: 400, message: 'user not found' });
    const { token: accessToken } = await createJwtTokenHandler({
      _id: userDetail._id,
      email: userDetail.email,
      expiresIn: '1 days',
      tokenType: 'accessToken',
      tokenScope: 'user',
    });
    const { token: refreshToken } = await createJwtTokenHandler({
      _id: userDetail._id,
      email: userDetail.email,
      expiresIn: '7 days',
      tokenType: 'refreshToken',
      tokenScope: 'user',
    });

    const expires = new Date(Date.now() + 1000 * 60 * 60 * 24 * 7);
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      expires,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      expires,
    });

    return res.json({
      name: userDetail.name,
      email: userDetail.email,
      _id: userDetail._id,
    });
  }
}
