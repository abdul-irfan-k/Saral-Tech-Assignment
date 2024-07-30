import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '@/lib/util/bad-request-error';
import { IGetUserUseCase } from '@lib/use-case/interface/user';

export class GetUserController {
  constructor(private getUserUseCase: IGetUserUseCase) {}

  async processRequest(req: Request, res: Response, next: NextFunction) {
    const { _id } = req.user;
    const user = await this.getUserUseCase.execute({
      _id,
    });
    if (user == null)
      throw new BadRequestError({ code: 400, message: 'User not found' });
    return res.status(200).json(user);
  }
}
