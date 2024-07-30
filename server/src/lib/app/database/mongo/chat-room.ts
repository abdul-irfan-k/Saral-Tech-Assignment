import { chatRoomEntity } from '@lib/entities/chat-room';
import { Document, Model, Schema, model } from 'mongoose';
import { v4 as uuidv4 } from 'uuid';

const chatRoomConversationsSchema = new Schema({
  messageId: String,
  messageType: String,
});

const chatRoomSchema = new Schema(
  {
    _id: { type: String, default: uuidv4() },
    userIds: { type: [String] },
    chatRoomConversations: {
      type: [chatRoomConversationsSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export interface IChatRoomModel extends chatRoomEntity {}
//@ts-ignore
export const ChatRoomModel = model<IChatRoomModel>('ChatRoom', chatRoomSchema);
