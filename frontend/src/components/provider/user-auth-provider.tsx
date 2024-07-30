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
  receiveTextMessageHandler,
} from "@/redux/actions/chat-action/chat-action";

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

  const { socket } = useSocketIoContext();

  useEffect(() => {
    dispatch(addAllChatUsersAndGroup());
  }, []);

  useEffect(() => {
    console.log("socket join", isLogedIn, socket);
    if (isLogedIn && socket != undefined) {
      socket.emit("socket:join", { userId: userDetails?._id });
    }
  }, [isLogedIn, dispatch, socket]);

  useEffect(() => {
    dispatch(checkUserIsLogedIn());
  }, []);

  useEffect(() => {
    if (socket == undefined) return;
    socket.on("message:receiveTextMessage", (messageData) => {
      dispatch(receiveTextMessageHandler(messageData));
    });
  }, [dispatch, isLogedIn, socket]);

  return <>{children}</>;
};

export default UserAuthProvider;
