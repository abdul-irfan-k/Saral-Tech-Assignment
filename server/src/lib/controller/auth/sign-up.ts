import { Request, Response } from 'express';
import { createJwtTokenHandler } from '../../util/jsonwebtoken';
import { BadRequestError } from '../../util/bad-request-error';
import { validationResult } from 'express-validator';
import { IGetUserUseCase, ISignUpUseCase } from '@lib/use-case/interface/user';

export class SignUpController {
  constructor(
    private signUpUseCase: ISignUpUseCase,
    private getUserUseCase: IGetUserUseCase,
  ) {}
  async processRequest(req: Request, res: Response) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new BadRequestError({ code: 400, validatorError: errors.array() });
    }
    const { name, email, password, profileImageUrl } = req.body;
    const oldUser = await this.getUserUseCase.execute({ email });

    if (oldUser != null)
      throw new BadRequestError({
        message: 'email already have an account',
        code: 400,
      });
    const userDetails = await this.signUpUseCase.execute({
      name,
      email,
      password,
      profileImageUrl,
    });

    const { token: accessToken } = await createJwtTokenHandler({
      _id: userDetails._id,
      email: userDetails.email,
      expiresIn: '7 days',
      tokenType: 'accessToken',
      tokenScope: 'user',
    });
    const { token: refreshToken } = await createJwtTokenHandler({
      _id: userDetails._id,
      email: userDetails.email,
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
    return res.json(userDetails);
  }
}
