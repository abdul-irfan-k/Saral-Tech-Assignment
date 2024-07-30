"use client";
import ChatContainer from "@/components/messenger/chat/chat-container";
import MessengerSidebar from "@/components/messenger/sidebar/messenger-sidebar";
import React, { useState } from "react";

export default function HomePage() {
  const [chatSelection, setChatSelection] = useState<"private" | "group">(
    "private"
  );
  return (
    <div className="relative flex gap-5 w-full flex-1 ">
      <div className="relative  w-full md:w-[50%] lg:w-[35%] xl:w-[34%] ">
        <MessengerSidebar
          isInitialRender
          chatSelection={chatSelection}
          setChatSelection={setChatSelection}
        />
      </div>
      <div className="hidden w-full md:block">{/* <ChatContainer /> */}</div>
    </div>
  );
}
