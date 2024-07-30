import { userEntity } from '@lib/entities';
import { ChatRoomModel, IChatRoomModel } from '../database/mongo';

export const userRepository: IChatRoomRepository = {
  getOrCreate: async (userIds) => {
    const avilableRoom = await ChatRoomModel.findOne({
      userIds: { $all: userIds },
    });
    if (avilableRoom != null) return;

    const newRoom = new ChatRoomModel({ userIds: userIds });
    await newRoom.save();
  },

  addChatConversation: async ({ chatRoomId, messageId, messageType }) => {
    await ChatRoomModel.findOneAndUpdate(
      { _id: chatRoomId },
      { $push: { chatRoomConversations: { messageId, messageType } } },
    );
    return;
  },
  getChats: async ({ chatRoomId, skip, step, limit, sort }) => {
    const arrayStartingFrom = skip != undefined ? -(skip + 1) * step : -1;
    const messageLimit = limit != undefined ? limit : 10;
    const messageSort = sort != undefined && sort == 'ACCENDING' ? -1 : 1;

    await ChatRoomModel.aggregate([
      { $match: { _id: chatRoomId } },
      {
        $project: {
          chatRoomConversations: {
            $slice: ['$chatRoomConversations', arrayStartingFrom, messageLimit],
          },
        },
      },
      { $unwind: '$chatRoomConversations' },
      {
        $group: {
          _id: null,
          messages: {
            $push: {
              type: '$chatRoomConversations.messageType',
              id: '$chatRoomConversations.messageId',
            },
          },
        },
      },

      {
        $project: {
          allMessages: {
            $map: {
              input: '$messages',
              as: 'message',
              in: {
                textMessageIds: {
                  $cond: {
                    if: { $eq: ['$$message.type', 'textMessage'] },
                    then: '$$message.id',
                    else: '$$REMOVE',
                  },
                },
                voiceMessageIds: {
                  $cond: {
                    if: { $eq: ['$$message.type', 'voiceMessage'] },
                    then: '$$message.id',
                    else: '$$REMOVE',
                  },
                },
                imageMessageIds: {
                  $cond: {
                    if: { $eq: ['$$message.type', 'imageMessage'] },
                    then: '$$message.id',
                    else: '$$REMOVE',
                  },
                },
                videoMessageIds: {
                  $cond: {
                    if: { $eq: ['$$message.type', 'videoMessage'] },
                    then: '$$message.id',
                    else: '$$REMOVE',
                  },
                },
              },
            },
          },
        },
      },

      {
        $lookup: {
          from: 'textmessages',
          let: { messageIds: '$allMessages.textMessageIds' },
          pipeline: [{ $match: { $expr: { $in: ['$_id', '$$messageIds'] } } }],
          as: 'textMessage',
        },
      },
      {
        $lookup: {
          from: 'voicemessages',
          let: { voiceMessageIds: '$allMessages.voiceMessageIds' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$voiceMessageIds'] } } },
          ],
          as: 'voiceMessage',
        },
      },
      {
        $lookup: {
          from: 'imagemessages',
          let: { imageMessageIds: '$allMessages.imageMessageIds' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$imageMessageIds'] } } },
          ],
          as: 'imageMessage',
        },
      },
      {
        $lookup: {
          from: 'videomessages',
          let: { videoMessageIds: '$allMessages.videoMessageIds' },
          pipeline: [
            { $match: { $expr: { $in: ['$_id', '$$videoMessageIds'] } } },
          ],
          as: 'videoMessage',
        },
      },

      {
        $addFields: {
          messages: {
            $concatArrays: [
              '$textMessage',
              '$voiceMessage',
              '$imageMessage',
              '$videoMessage',
            ],
          },
        },
      },
      {
        $project: {
          messages: {
            $sortArray: {
              input: '$messages',
              sortBy: { createdAt: messageSort },
            },
          },
        },
      },
    ]);
  },
};

export interface IChatRoomRepository {
  getOrCreate: (userIds: string[]) => Promise<void>;
  addChatConversation: (details: {
    messageId: string;
    messageType: 'textMessage';
    chatRoomId: string;
  }) => Promise<void>;
  getChats: (details: {
    chatRoomId: string;
    skip?: number;
    step: number;
    limit?: number;
    sort?: string;
  }) => Promise<any>;
}
