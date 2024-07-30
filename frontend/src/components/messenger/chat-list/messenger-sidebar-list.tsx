"use client";
import { updateCurrentChaterHandler } from "@/redux/actions/chat-action/chat-action";
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer";
import { FC, useState } from "react";
import { useSelector } from "react-redux";
import ChatListBox from "./chat-list-box/chat-list-box";
import { useAppDispatch } from "@/redux/store";

interface MessengerSidebarListProps {
  chatSelection: "private" | "group";
}
const MessengerSidebarList: FC<MessengerSidebarListProps> = ({
  chatSelection,
}) => {
  const { usersDeatail, groupDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList
  );

  const dispatch = useAppDispatch();

  return (
    <div className="flex flex-col  mt-10 gap-5    w-full   ">
      {chatSelection == "private" &&
        usersDeatail.map((userDetail, index) => {
          return (
            // <Link href={`/messenger/${userDetail.userId}`} key={index}>
            <ChatListBox
              key={index}
              onClickHandler={() => {
                dispatch(
                  updateCurrentChaterHandler({ userDetail, isChanged: true })
                );
              }}
              communicatorName={userDetail.name}
              imageSrc={
                userDetail.profileImageUrl != undefined
                  ? userDetail.profileImageUrl
                  : "/Asset/avatar.jpg"
              }
              lastMessageTime={new Date()}
              onlineStatus={
                userDetail.status?.onlineStatus == "online" ? true : false
              }
              currentStatus={{ isSendingMessage: false }}
            />
            // </Link>
          );
        })}
    </div>
  );
};

export default MessengerSidebarList;
