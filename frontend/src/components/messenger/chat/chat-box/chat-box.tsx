"use client";
import { useSelector } from "react-redux";
import TextMessage from "./text-message/text-message";
import { chatRoomMessagesReducerSlate } from "@/redux/reducers/message-reducer/message-reducer";
import { chatUsersListReducerState } from "@/redux/reducers/chat-user-reducer/chat-user-reducer";
import MessageInfiniteScroll from "@/components/shared/infinite-scroll/infinite-scroll";
import { userDetailState } from "@/redux/reducers/user-reducer/user-reducer";
const ChatBox = () => {
  const { currentChaterMessage } = useSelector(
    (state: { chatRoomsMessageReducer: chatRoomMessagesReducerSlate }) =>
      state.chatRoomsMessageReducer
  );
  const { currentChaterDetail } = useSelector(
    (state: { chatUsersList: chatUsersListReducerState }) => state.chatUsersList
  );
  const { userDetail } = useSelector(
    (state: { userDetail: userDetailState }) => state.userDetail
  );

  return (
    <div className="relative px-10 h-full   md:h-[70vh] ">
      {userDetail != null && currentChaterDetail != null && (
        <MessageInfiniteScroll
          currentChaterDetail={currentChaterDetail}
          userDetail={userDetail}
          totalFetchedMessages={currentChaterMessage?.totalFetchedMessages}
          totatMessages={currentChaterMessage?.totatMessages}
        >
          {currentChaterMessage?.messages.map((message) => {
            return (
              <>
                <div>
                  {message.messageData.messageType == "textMessage" && (
                    <>
                      <TextMessage
                        messageContent={message.messageData.message}
                        messegeChannelType={message.messegeChannelType}
                        //@ts-ignore
                        time={message.messageData.messageSendedTime}
                        //@ts-ignore
                        // userImageSrc={
                        //   message.messegeChannelType == "incomingMessage"
                        //     ? currentChaterDetail.currentChaterType == "user" &&
                        //       currentChaterDetail.profileImageUrl
                        //       ? currentChaterDetail.profileImageUrl
                        //       : message.messageData.postedByUser.profileImageUrl
                        //     : userDetail.profileImageUrl
                        // }
                        userImageSrc="/Asset/avatar.jpg"
                        userName={
                          message.messegeChannelType == "incomingMessage"
                            ? currentChaterDetail.currentChaterType == "user"
                              ? currentChaterDetail.name
                              : message.messageData.postedByUser.name
                            : userDetail?.name
                        }
                        _id={message.messageData._id}
                      />
                    </>
                  )}
                </div>
              </>
            );
          })}
        </MessageInfiniteScroll>
      )}
    </div>
  );
};

export default ChatBox;
