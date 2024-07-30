import { textEntity } from '@lib/entities/text-message';
import { Model, Schema, model, Types } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const textMessageSchema = new Schema(
  {
    _id: { type: String, default: uuidv4 },
    chatRoomId: { type: String, required: true },
    postedByUser: { type: String, required: true },
    message: { type: String, required: true },
    messageType: { type: String, default: 'textMessage' },
  },
  {
    timestamps: true,
  },
);

interface createNewMessageInChatRoom {
  chatRoomId: string;
  postedByUser: string;
  message: string;
  _id?: string;
}

export interface ITextMessageModel extends textEntity {}
export const TextMessageModel = model<ITextMessageModel>(
  'TextMessage',
  textMessageSchema,
);
