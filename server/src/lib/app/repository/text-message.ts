import { textEntity } from '@lib/entities/text-message';
import { ITextMessageModel, TextMessageModel } from '../database/mongo';

export const textMessageRepository: ITextMessageRepository = {
  create: async (messageData) => {
    const newMessage = new TextMessageModel(messageData);
    await newMessage.save();
    return newMessage;
  },
};

export interface ITextMessageRepository {
  create: (
    userData: Omit<textEntity, '_id'> & { _id?: string },
  ) => Promise<ITextMessageModel>;
}
