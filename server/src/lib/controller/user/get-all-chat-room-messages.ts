import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '@/lib/util/bad-request-error';
import {
  IGetAllChatUserUseCase,
  IGetChatRoomMessagesUseCase,
} from '@lib/use-case/interface/user';

export class GetAllChatRoomMessageController {
  constructor(private getChatRoomMessage: IGetChatRoomMessagesUseCase) {}

  async processRequest(req: Request, res: Response, next: NextFunction) {
    const { chatRoomId, skip, step, limit, sort } = req.body;
    const chatRoomMessage = await this.getChatRoomMessage.execute({
      chatRoomId,
      skip,
      step,
      limit,
      sort,
    });;
    return res.status(200).json(chatRoomMessage);
  }
}
