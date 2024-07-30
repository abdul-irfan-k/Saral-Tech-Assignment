"use client";

import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { sendTextMessageHandler } from "@/redux/actions/chat-action/chat-action";
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer";
import { useAppDispatch } from "@/redux/store";
import { useSocketIoContext } from "@/components/provider/socket-io-provider/socket-io-provider";
import { userDetailState } from "@/redux/reducers/user-reducer/user-reducer";
import { Notebook, Plus, Send, Smile } from "lucide-react";
//@ts-ignore

type inputPopUpMenuType = "emoji" | "sticker" | "media" | undefined;

const InputBox = () => {
  const dispatch = useAppDispatch();
  const [inputMessage, setInputMessage] = useState("");
  const [inputPopUpMenuType, setInputPopUpMenuType] =
    useState<inputPopUpMenuType>(undefined);

  const { socket } = useSocketIoContext();
  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList
  );
  const { userDetail } = useSelector(
    (state: { userDetail: userDetailState }) => state.userDetail
  );

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputMessage(e.target.value);
  };

  const popUpMenuButtonHandler = (popUpMenuType: inputPopUpMenuType) => {
    if (popUpMenuType == inputPopUpMenuType)
      return setInputPopUpMenuType(undefined);
    setInputPopUpMenuType(popUpMenuType);
  };

  const sendButtonHandler = () => {
    if (currentChaterDetail == null || userDetail == null) return;

    const details = {
      message: { messageContent: inputMessage },
      chatRoomDetail: { _id: currentChaterDetail.chatRoomId },
      senderDetails: {
        _id: userDetail._id,
        name: userDetail.name,
        profileImageUrl: userDetail.profileImageUrl,
      },
    };

    if (currentChaterDetail.currentChaterType == "user")
      dispatch(
        sendTextMessageHandler(
          {
            ...details,
            messageChannelType: "private",
            receiverDetails: { _id: currentChaterDetail._id },
          },
          //@ts-ignore
          socket
        )
      );

    setInputMessage("");
  };

  return (
    <div className="mt-auto flex  items-center md:gap-3">
      <div className="hidden md:block">
        <div
          className="relative w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
          onClick={() => setInputPopUpMenuType("sticker")}
        >
          <Notebook />
        </div>
      </div>
      <div className="relative">
        <div
          className="relative w-10 flex flex-col justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
          onClick={() => popUpMenuButtonHandler("emoji")}
        >
          <Smile />
        </div>
      </div>
      <div className="relative">
        <div
          className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
          onClick={() => popUpMenuButtonHandler("media")}
        >
          <Plus />
        </div>
      </div>

      <div className="relative flex w-full md:gap-3">
        <div className="flex-1 px-1 md:px-5">
          <input
            type="text"
            value={inputMessage}
            onChange={inputChangeHandler}
            className="px-4 py-2 w-full rounded-full text-slate-950  bg-slate-300 outline-none dark:text-slate-50 dark:bg-slate-800"
          />
        </div>
        <div
          onClick={sendButtonHandler}
          className="w-10 flex justify-center items-center aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
        >
          <Send />
        </div>
      </div>
    </div>
  );
};

export default InputBox;
