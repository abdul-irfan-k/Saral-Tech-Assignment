import React, { FC, useState } from "react";
import Recent from "../recent/recent";
import MessengerSort from "../messenger-sort/messenger-sort";
import AddButton from "../add-button/add-buttton";
import { motion, AnimatePresence } from "framer-motion";
import MessengerSidebarList from "../chat-list/messenger-sidebar-list";

interface MessengerSidebarProps {
  isInitialRender: boolean;
  chatSelection: "private" | "group";
  setChatSelection: React.Dispatch<React.SetStateAction<"private" | "group">>;
}

const MessengerSidebar: FC<MessengerSidebarProps> = ({
  isInitialRender,
  chatSelection,
  setChatSelection,
}) => {
  return (
    <div className="relative flex flex-col px-5 pt-4  h-[100vh]  bg-slate-200 dark:bg-neutral-950 overflow-hidden  ">
      <AnimatePresence>
        <motion.div
          key={"sidebarNotification"}
          initial={{ translateX: !isInitialRender ? "-100%" : "0%" }}
          animate={{ translateX: "0%" }}
          exit={{ translateX: "-100%" }}
          transition={{ duration: 0.4 }}
          // className="h-screen "
        >
          <Recent />
          <div className="mt-10 flex flex-col overflow-y-scroll no-scrollbar  h-[66vh]">
            <div className=" relative flex flex-col text-slate-950 dark:text-slate-50">
              <div className=" font-extrabold text-lg md:text-xl xl:text-2xl ">
                Chat
              </div>
              <div className="text-slate-800 font-normal text-sm md:text-base dark:text-slate-200">
                Start New Converstion
              </div>

              <div className="gap-5 mt-5  flex justify-between items-center fill-slate-950 font-medium text-base dark:fill-slate-50">
                <div
                  className={
                    "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
                    (chatSelection == "private"
                      ? "dark:bg-blue-500"
                      : "bg-slate-300 dark:bg-neutral-800")
                  }
                  onClick={() => setChatSelection("private")}
                >
                  <div className="relative w-5 ">
                    {/* <IdBadge className="aspect-square" /> */}
                  </div>
                  <div className=""> Person</div>
                </div>
                <div
                  className={
                    "gap-1  py-2 w-full rounded-full flex justify-center items-center " +
                    (chatSelection == "group"
                      ? "dark:bg-blue-500"
                      : "bg-slate-300 dark:bg-neutral-800")
                  }
                  onClick={() => setChatSelection("group")}
                >
                  <div className="relative w-5 ">
                    {/* <IdBadge className="aspect-square" /> */}
                  </div>
                  <div className=""> Group</div>
                </div>
              </div>
            </div>
            <MessengerSidebarList chatSelection={chatSelection} />
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MessengerSidebar;
