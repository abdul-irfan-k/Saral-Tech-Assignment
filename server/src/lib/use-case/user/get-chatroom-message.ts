import { IChatRoomRepository } from '@lib/app/repository';
import { IGetChatRoomMessagesUseCase } from '../interface/user';

export class GetChatRoomMessagesUseCase implements IGetChatRoomMessagesUseCase {
  constructor(private chatroomRepository: IChatRoomRepository) {}
  async execute(args: any): Promise<any | null> {
    return await this.chatroomRepository.getChats(args);
  }
}
