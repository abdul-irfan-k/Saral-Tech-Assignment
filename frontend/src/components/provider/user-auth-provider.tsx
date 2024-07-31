"use client";
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer";
import React, { FC, useEffect } from "react";
import { useSelector } from "react-redux";
import { checkUserIsLogedIn } from "@/redux/actions/user-action/user-action";
import { userDetailState } from "@/redux/reducers/user-reducer/user-reducer";
import { useAppDispatch } from "@/redux/store";
import { useSocketIoContext } from "./socket-io-provider/socket-io-provider";
import {
  addAllChatUsersAndGroup,
  getChatRoomMessageHandler,
  receiveTextMessageHandler,
} from "@/redux/actions/chat-action/chat-action";
import {
  chatRoomMessageAction,
  chatRoomMessagesReducerSlate,
} from "@/redux/reducers/message-reducer/message-reducer";

interface UserAuthProviderProps {
  children: React.ReactNode;
}
const UserAuthProvider: FC<UserAuthProviderProps> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { isChanged: isChatUserListChanged } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList
  );
  const {
    userDetail: userDetails,
    isChanged,
    isLogedIn,
  } = useSelector((state: { userDetail: userDetailState }) => state.userDetail);

  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList
  );
  const { messageAvailableChatRoom } = useSelector(
    (state: { chatRoomsMessageReducer: chatRoomMessagesReducerSlate }) =>
      state.chatRoomsMessageReducer
  );
  const { socket } = useSocketIoContext();

  useEffect(() => {
    dispatch(addAllChatUsersAndGroup());
  }, []);

  useEffect(() => {
    if (isLogedIn && socket != undefined) {
      socket.emit("socket:join", { userId: userDetails?._id });
    }
  }, [isLogedIn, dispatch, socket]);

  useEffect(() => {
    dispatch(checkUserIsLogedIn());
  }, []);

  useEffect(() => {
    if (socket == undefined) return;
    console.log("socket id", socket, socket.id);
    socket.on("message:receiveTextMessage", (messageData) => {
      console.log("receive text message");
      dispatch(receiveTextMessageHandler(messageData));
    });
  }, [dispatch, isLogedIn, socket]);

  useEffect(() => {
    if (currentChaterDetail == null || userDetails == null) return;
    const isAlreadAvailableMessage = messageAvailableChatRoom.some(
      (chatRoom) => chatRoom.chatRoomId == currentChaterDetail?.chatRoomId
    );
    if (isAlreadAvailableMessage) {
      dispatch(
        chatRoomMessageAction.addCurrentChaterMessage({
          chatRoomId: currentChaterDetail?.chatRoomId,
        })
      );
      return;
    }

    if (currentChaterDetail?.currentChaterType == "user") {
      dispatch(
        //@ts-ignore
        getChatRoomMessageHandler({
          chatRoomId: currentChaterDetail?.chatRoomId,
          //@ts-ignore
          myUserId: userDetails?._id,
        })
      );
    }
  }, [currentChaterDetail?._id]);

  return <>{children}</>;
};

export default UserAuthProvider;
