import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { chatUsersListReducer } from "./reducers/chat-user-reducer/chat-user-reducer";
import { userDetailReducer } from "./reducers/user-reducer/user-reducer";
import { chatRoomsMessageReducer } from "./reducers/message-reducer/message-reducer";
const combinedReducers = combineReducers({
  chatUsersList: chatUsersListReducer.reducer,
  userDetail: userDetailReducer.reducer,
  chatRoomsMessageReducer: chatRoomsMessageReducer.reducer,
});
export const store = configureStore({
  reducer: combinedReducers,
});

export type AppDispatch = typeof store.dispatch;
type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
