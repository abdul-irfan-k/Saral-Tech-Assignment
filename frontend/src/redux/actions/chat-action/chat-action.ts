import { SocketIO } from "@/components/provider/socket-io-provider/socket-io-provider";
import { axiosUserInstance } from "@/constants/axios";
import { chatUserListAction } from "@/redux/reducers/chat-user-reducer/chat-user-reducer";
import { chatRoomMessageAction } from "@/redux/reducers/message-reducer/message-reducer";
import { AppDispatch } from "@/redux/store";
import { Socket } from "socket.io-client";
import { v4 as uuid } from "uuid";
export const addAllChatUsersAndGroup = () => async (dispatch: AppDispatch) => {
  try {
    const { data: usersDeatail } = await axiosUserInstance.get(
      "/all-chat-users"
    );

    dispatch(
      chatUserListAction.addIntialAllUserAndGroupList({
        usersDeatail,
        groupDetail: [],
      })
    );
  } catch (error) {}
};

export const updateCurrentChaterHandler =
  (details: any) => async (dispatch: AppDispatch) => {
    dispatch(chatUserListAction.updateCurrentUser(details));
  };

export const getChatRoomMessageHandler =
  ({
    chatRoomId,
    myUserId,
    skip = 0,
    step = 10,
    limit = 10,
  }: {
    chatRoomId: string;
    myUserId: string;
    skip: number;
    step: number;
    limit: number;
  }) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosUserInstance.post("/all-chat-room-messages", {
        chatRoomId,
        skip,
        step,
        limit,
        sort: "ACCENDING",
      });
      if (data == undefined)
        return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}));

      //@ts-ignore
      const messageData = data[0].messages.map((elm) => {
        const messegeChannelType =
          elm.postedByUser == myUserId ? "outgoingMessage" : "incomingMessage";
        return {
          messageData: { ...elm, messageSendedTime: new Date(elm.createdAt) },
          messegeChannelType,
        };
      });

      const isInitialMessages = skip == 0;
      dispatch(
        chatRoomMessageAction.addChatRoomMessage({
          messageAndChatRoomDetails: {
            chatRoomId,
            messages: messageData,
            totatMessages: data.totalMessages,
          },
          isInitialMessages,
        })
      );
      dispatch(
        chatRoomMessageAction.addMessageAvailableChatRooms({ chatRoomId })
      );
    } catch (error) {
      console.log(error);
      return dispatch(chatRoomMessageAction.removeCurrentChaterMessage({}));
    }
  };

export type sendTextMessageHandlerArgs = any;
export const sendTextMessageHandler =
  (details: sendTextMessageHandlerArgs, socket: SocketIO) =>
  async (dispatch: AppDispatch) => {
    const { chatRoomDetail, message, messageChannelType, senderDetails } =
      details;

    message._id = uuid();
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMessage({
        chatRoomId: chatRoomDetail._id,
        newMessage: {
          messegeChannelType: "outgoingMessage",
          messageData: {
            _id: message._id,
            messageType: "textMessage",
            message: message.messageContent,
            chatRoomId: details.chatRoomDetail._id,
            postedByUser: details.senderDetails,
          },
        },
      })
    );

    if (messageChannelType == "private") {
      socket.emit(
        "message:newTextMessage",
        {
          message,
          chatRoomDetail,
          messageChannelType,
          senderDetails,
          receiverDetails: details.receiverDetails,
        },
        (response: any) => {}
      );
    }
  };

export const receiveTextMessageHandler =
  ({ senderDetails, chatRoomDetail, message }: any) =>
  async (dispatch: AppDispatch) => {
    dispatch(
      chatRoomMessageAction.addSendedChatRoomMessage({
        chatRoomId: chatRoomDetail._id,
        newMessage: {
          messegeChannelType: "incomingMessage",
          messageData: {
            chatRoomId: chatRoomDetail._id,
            _id: message._id,
            message: message.messageContent,
            messageType: "textMessage",
            messageSendedTime: new Date(),
            postedByUser: senderDetails,
          },
        },
      })
    );
  };
