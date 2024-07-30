"use client";
import Image from "next/image";

import { FC, MouseEvent, MouseEventHandler, useEffect } from "react";
import { useSelector } from "react-redux";
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer";

import { useAppDispatch } from "@/redux/store";
import { ArrowLeft, Phone, Search, Speaker, Video } from "lucide-react";
import { useSocketIoContext } from "@/components/provider/socket-io-provider/socket-io-provider";
import { userDetailState } from "@/redux/reducers/user-reducer/user-reducer";

interface ChatProfileInstance {
  name: string;
  profileImageSrc: string;
  currentStatus: "online" | "ofline";
  backButtonHandler?(): void;
}

const ChatProfile: FC<ChatProfileInstance> = ({
  name,
  profileImageSrc,
  currentStatus,
  backButtonHandler,
}) => {
  const { socket } = useSocketIoContext();
  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList
  );
  const { userDetail } = useSelector(
    (state: { userDetail: userDetailState }) => state.userDetail
  );

  const dispatch = useAppDispatch();

  return (
    <div className="w-full py-4 px-4    rounded-md flex items-center bg-slate-200 fill-slate-950 dark:bg-neutral-950 dark:fill-slate-50 md:p-5">
      <div className="block md:hidden">
        <div
          className=" relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800"
          onClick={backButtonHandler}
        >
          <ArrowLeft className="aspect-square w-7" width="" height="" />
        </div>
      </div>
      <div className="ml-2 relative   w-[10%]   aspect-square md:w-[6%] md:ml-0">
        <Image
          src={profileImageSrc}
          alt="user-image"
          fill
          className="rounded-3xl"
        />
        <div
          className={
            "absolute right-0 top-0 w-4  aspect-square rounded-full border-[3px] border-slate-200 dark:border-neutral-950" +
            " bg-yellow-300"
          }
        ></div>
      </div>
      <div className="gap-2 flex flex-col ml-3 ">
        <div className="font-medium text-lg  text-slate-950 dark:text-slate-50 ">
          {name}
        </div>
        <div className="hidden md:block">
          {currentStatus == "online" && (
            <div className="  flex items-center justify-center rounded-full ">
              online
            </div>
          )}
          {currentStatus == "ofline" && (
            <div className="  flex items-center justify-center rounded-full text-green-500 ">
              online
            </div>
          )}
        </div>
      </div>

      <div className="hidden md:block">
        <div className="ml-3 relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
          <Speaker className="aspect-square p-3" />
        </div>
      </div>
      <div className="ml-auto relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <Search className="aspect-square p-3" />
      </div>
      <div className="ml-3 relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <Phone className="aspect-square p-3" />
      </div>
      <div className="ml-3 relative flex items-center justify-center w-10 aspect-square bg-slate-300 rounded-full dark:bg-slate-800">
        <Video className="aspect-square p-3" />
      </div>
    </div>
  );
};

export default ChatProfile;
