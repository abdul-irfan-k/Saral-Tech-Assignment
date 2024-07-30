import { createSlice } from "@reduxjs/toolkit";

const chatRoomMessagesIntialState: chatRoomMessagesReducerSlate = {
  chatRoomMessages: [],
  messageAvailableChatRoom: [],
};

export const chatRoomsMessageReducer = createSlice({
  name: "chatRoomMessageReducer",
  initialState: chatRoomMessagesIntialState,
  reducers: {
    addChatRoomMessage: (
      state,
      action: {
        payload: {
          messageAndChatRoomDetails: chatRoomMessages;
          isInitialMessages: boolean;
        };
      }
    ) => {
      if (action.payload.isInitialMessages)
        return {
          ...state,
          chatRoomMessages: [
            ...state.chatRoomMessages,
            {
              ...action.payload.messageAndChatRoomDetails,
              totalFetchedMessages: 10,
            },
          ],
          currentChaterMessage: {
            ...action.payload.messageAndChatRoomDetails,
            totalFetchedMessages: 10,
          },
        };

      const oldMessages = state.chatRoomMessages.filter(
        (chatRoom) =>
          chatRoom.chatRoomId ==
          action.payload.messageAndChatRoomDetails.chatRoomId
      )[0];

      const otherChatRoomMessages = state.chatRoomMessages.filter(
        (chatRoom) =>
          chatRoom.chatRoomId !=
          action.payload.messageAndChatRoomDetails.chatRoomId
      );

      const currentChaterMessage: chatRoomMessages = {
        ...action.payload.messageAndChatRoomDetails,
        messages: [
          ...oldMessages.messages,
          ...action.payload.messageAndChatRoomDetails.messages,
        ],
        totatMessages: oldMessages.totatMessages,
        totalFetchedMessages:
          oldMessages.totalFetchedMessages != undefined
            ? oldMessages.totalFetchedMessages + 10
            : 10,
      };

      return {
        ...state,
        chatRoomMessages: [
          ...otherChatRoomMessages,
          {
            ...action.payload.messageAndChatRoomDetails,
            messages: [...currentChaterMessage.messages],
          },
        ],
        currentChaterMessage,
      };
      // return {...state}
    },

    removeCurrentChaterMessage: (state, action) => {
      return { ...state, currentChaterMessage: undefined };
    },
    addCurrentChaterMessage: (state, action) => {
      const currentChaterMessage = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId
      );
      state.currentChaterMessage = currentChaterMessage[0];
    },
    addSendedChatRoomMessage: (
      state,
      action: {
        payload: {
          chatRoomId: string;
          newMessage: incomingMessage | outGoingMessage;
        };
      }
    ) => {
      const updatedChatRoomMessage = state.chatRoomMessages.filter(
        (chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId
      )[0];

      if (updatedChatRoomMessage == undefined) {
        const newChatRoomMessage: chatRoomMessages = {
          chatRoomId: action.payload.chatRoomId,
          messages: [{ ...action.payload.newMessage }],
        };
        state.chatRoomMessages = [
          ...state.chatRoomMessages.filter(
            (chatRoom) => chatRoom.chatRoomId != action.payload.chatRoomId
          ),
          { ...newChatRoomMessage },
        ];
        state.currentChaterMessage = newChatRoomMessage;
      } else {
        updatedChatRoomMessage.messages = [
          { ...action.payload.newMessage },
          ...updatedChatRoomMessage.messages,
        ];
        state.chatRoomMessages = [
          ...state.chatRoomMessages.filter(
            (chatRoom) => chatRoom.chatRoomId != action.payload.chatRoomId
          ),
          { ...updatedChatRoomMessage },
        ];
        state.currentChaterMessage = updatedChatRoomMessage;
      }
    },

    addMessageAvailableChatRooms: (state, action) => {
      const isAlreadAvailableMessage = state.messageAvailableChatRoom.some(
        (chatRoom) => chatRoom.chatRoomId == action.payload.chatRoomId
      );
      if (isAlreadAvailableMessage) return { ...state };
      state.messageAvailableChatRoom = [
        ...state.messageAvailableChatRoom,
        action.payload,
      ];
    },
  },
});
export const chatRoomMessageAction = chatRoomsMessageReducer.actions;

interface textMessage {
  message: string;
  messageType: "textMessage";
  _id: string;
  chatRoomId: string;
  postedByUser: {
    _id?: string;
    name: string;
    profileImageUrl: string;
  };
  messageSendedTime?: Date | string;
}

type messageType = textMessage;

export interface outGoingMessage {
  messegeChannelType: "outgoingMessage";
  messageData: messageType;
}
export interface incomingMessage {
  messegeChannelType: "incomingMessage";
  messageData: messageType;
}
export type messageTypes = outGoingMessage | incomingMessage;

interface chatRoomMessages {
  chatRoomId: string;
  messages: Array<outGoingMessage | incomingMessage>;
  isAllMessageFetched?: boolean;
  totalFetchedMessages?: number;
  totatMessages?: number;
}

interface allChatRoomMessages {
  chatRoomMessages: chatRoomMessages[];
  currentChaterMessage?: chatRoomMessages;
  messageAvailableChatRoom: availabeChatRoom[];
}

interface availabeChatRoom {
  chatRoomId: string;
}

export type chatRoomMessagesReducerSlate = allChatRoomMessages;
