import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { BadRequestError } from '@/lib/util/bad-request-error';
import { IGetAllChatUserUseCase } from '@lib/use-case/interface/user';

export class GetAllChatUserController {
  constructor(private getallChatUserUseCase: IGetAllChatUserUseCase) {}

  async processRequest(req: Request, res: Response, next: NextFunction) {
    const { _id } = req.user;
    console.log('_id', _id);
    const user = await this.getallChatUserUseCase.execute({
      _id,
    });
    console.log('users', user);
    if (user == null)
      throw new BadRequestError({ code: 400, message: 'User not found' });
    return res.status(200).json(user);
  }
}
