import { textEntity } from '@lib/entities/text-message';
import { ITextMessageModel, TextMessageModel } from '../database/mongo';

export const userRepository: IUserRepository = {
  create: async (messageData) => {
    const newMessage = new TextMessageModel(messageData);
    await newMessage.save();
    return newMessage;
  },
};

export interface IUserRepository {
  create: (
    userData: Omit<textEntity, '_id'> & { _id?: string },
  ) => Promise<ITextMessageModel>;
}
