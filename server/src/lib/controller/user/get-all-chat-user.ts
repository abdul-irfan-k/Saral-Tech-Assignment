import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '@/lib/util/bad-request-error';
import { IGetAllChatUserUseCase } from '@lib/use-case/interface/user';

export class GetAllChatUserController {
  constructor(private getallChatUserUseCase: IGetAllChatUserUseCase) {}

  async processRequest(req: Request, res: Response, next: NextFunction) {
    const { _id } = req.user;
    const respose = await this.getallChatUserUseCase.execute({
      _id,
    });
    if (respose == null)
      throw new BadRequestError({ code: 400, message: 'User not found' });
    return res.status(200).json(respose);
  }
}
