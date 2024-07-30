import SocketModel from '@lib/app/database/mongo/socket';
import {
  getRedisSocketCached,
  removeRedisSocketCachedData,
} from '@lib/app/database/redis/cache-model';
import { chatRoomRepository, textMessageRepository } from '@lib/app/repository';
import mongoose from 'mongoose';
import { Server, Socket } from 'socket.io';
export class SocketMessageService {
  constructor(
    public io: Server,
    public socket: Socket,
  ) {}
  listen() {
    this.socket.on('socket:join', async ({ userId }) => {
      const ip = this.getSocketIp();
      await SocketModel.create({
        socketId: this.socket.id,
        ip,
        userId,
      });
    });

    this.socket.on('disconnect', async () => {
      const socketData = await SocketModel.findOne({
        socketId: this.socket.id,
      });
      if (socketData != null)
        await removeRedisSocketCachedData(`socket:${socketData.userId}`);
      await SocketModel.deleteMany({
        socketId: this.socket.id,
      });

      if (socketData == null) return;
    });

    this.socket.on(
      'message:newTextMessage',
      async (
        {
          message,
          receiverDetails,
          senderDetails,
          chatRoomDetail,
          messageChannelType,
        },
        callback,
      ) => {
        try {
          const receiver = await getRedisSocketCached(receiverDetails._id);
          await chatRoomRepository.getOrCreate([
            receiverDetails._id,
            senderDetails._id,
          ]);

          if (receiver != null) {
            console.log('receiver');
            this.socket
              .to(receiver.socketId)
              .emit('message:receiveTextMessage', {
                message,
                senderDetails,
                chatRoomDetail,
                receiverDetails,
                messageChannelType,
              });
          }

          const textMessage = await textMessageRepository.create({
            chatRoomId: chatRoomDetail._id,
            message: message.messageContent,
            postedByUser: senderDetails._id,
            _id: message._id,
            messageType: 'textMessage',
          });
          await chatRoomRepository.addChatConversation({
            chatRoomId: chatRoomDetail._id,
            messageId: textMessage._id,
            messageType: 'textMessage',
          });
          if (callback != undefined) callback({ isSended: true });
        } catch (error) {
          console.log(error);
        }
      },
    );
  }

  private getSocketIp() {
    return (
      (this.socket.handshake.headers['x-real-ip'] as string) ||
      this.socket.request.connection.remoteAddress ||
      ''
    );
  }
}
