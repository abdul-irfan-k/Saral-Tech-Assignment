"use client";

import { useSelector } from "react-redux";
import ChatBox from "./chat-box/chat-box";
import ChatProfile from "./chat-profile/chat-profile";
import InputBox from "./input-box/input-box";
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";

const ChatContainer = () => {
  const { currentChaterDetail, isCurrentChatingWithGroup } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) =>
      state?.chatUsersList
  );
  const [showChaterToggleProfile, setShowChaterToggleProfile] =
    useState<boolean>(false);

  return (
    <>
      <div className="py-5 relative  h-full flex flex-col  w-[90%]">
        <>
          {currentChaterDetail != null &&
            currentChaterDetail.currentChaterType == "user" && (
              <div
                onClick={() =>
                  setShowChaterToggleProfile(!showChaterToggleProfile)
                }
              >
                <ChatProfile
                  currentStatus="ofline"
                  profileImageSrc={
                    currentChaterDetail.profileImageUrl
                      ? currentChaterDetail.profileImageUrl
                      : "/Asset/avatar.jpg"
                  }
                  {...currentChaterDetail}
                />
              </div>
            )}

          {currentChaterDetail != null && <ChatBox />}

          {currentChaterDetail != null && (
            <>
              {currentChaterDetail.currentChaterType == "user" && <InputBox />}
            </>
          )}
        </>
      </div>
    </>
  );
};

export default ChatContainer;
