import { createSlice } from "@reduxjs/toolkit";

interface ChatRoomUserStatus {
  onlineStatus: "online" | "ofline";
}

interface chatUserDetail {
  _id: string;
  name: string;
  userId: string;
  email: string;
  profileImageUrl?: string;
  chatRoomId: string;
  isStoredChatRoomMessages?: boolean;
  status?: ChatRoomUserStatus;
}

interface currentChaterUserDetail extends chatUserDetail {
  currentChaterType: "user";
}

interface chatGroupDetails {
  _id: string;
  name: string;
  groupImageUrl?: string;
  chatRoomId: string;
}

interface currentChatingGroupDetail extends chatGroupDetails {
  currentChaterType: "group";
}

type currentChaterDetailType =
  | null
  | currentChaterUserDetail
  | currentChatingGroupDetail;
interface chatUsersListReducer {
  usersDeatail: chatUserDetail[];
  groupDetail: chatGroupDetails[];
  isChanged: Boolean;
  currentChaterDetail: currentChaterDetailType;
  isCurrentChatingWithGroup: boolean;
}

export type chatUsersListReducerState = chatUsersListReducer;
const chatUserListInitialState: chatUsersListReducerState = {
  usersDeatail: [],
  groupDetail: [],
  isChanged: false,
  currentChaterDetail: null,
  isCurrentChatingWithGroup: false,
};

export const chatUsersListReducer = createSlice({
  name: "chatUserListReducer",
  initialState: chatUserListInitialState,
  reducers: {
    addIntialAllUserAndGroupList: (state, action) => {
      // console.log('action',action.payload)
      return {
        isChanged: true,
        usersDeatail: [...action.payload.usersDeatail],
        groupDetail: [...action.payload.groupDetail],
        currentChaterDetail: null,
        isCurrentChatingWithGroup: true,
      };
    },

    addintialOnlineUsers: (state, action) => {
      const updatedUserDetail = state.usersDeatail.map((userDetail) => {
        const onlineStatus = action.payload.onlineUsers.some(
          (onlineUser: any) => onlineUser.userId == userDetail._id
        )
          ? "online"
          : "ofline";
        return { ...userDetail, status: { onlineStatus } };
      });

      //@ts-ignore
      state.usersDeatail = updatedUserDetail;
    },
    changeUserOnlineStatus: (state, action) => {
      const updatedUserDetail = state.usersDeatail.map((userDetail) => {
        if (userDetail._id == action.payload._id)
          return { ...userDetail, status: action.payload.status };
        else return { ...userDetail };
      });

      state.usersDeatail = updatedUserDetail;
    },

    updateCurrentUser: (state, action) => {
      state.currentChaterDetail = {
        ...action.payload.userDetail,
        currentChaterType: "user",
      };
      state.isCurrentChatingWithGroup = false;
    },

    updateCurrentChatingGroup: (state, action) => {
      state.currentChaterDetail = {
        ...action.payload.groupDetail,
        currentChaterType: "group",
      };
      state.isCurrentChatingWithGroup = true;
    },
  },
});

export const chatUserListAction = chatUsersListReducer.actions;
