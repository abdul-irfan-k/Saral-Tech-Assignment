import { axiosAuthInstance, axiosUserInstance } from "@/constants/axios";
import {
  userDetailAction,
  userDetailState,
  userSignUpAction,
} from "@/redux/reducers/user-reducer/user-reducer";
import { AppDispatch } from "@/redux/store";
import axios from "axios";
//@ts-ignore
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context";

export const loginHandler =
  (details: Object, router: AppRouterInstance) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosAuthInstance.post("/sign-in", { ...details });
      router.push("/");
      dispatch(
        //@ts-ignore
        userDetailAction.setUserDetail({
          userDetail: { name: data.name, email: data.email, _id: data._id },
          isLogedIn: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const signUpHandler =
  (details: Object, router: AppRouterInstance) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosAuthInstance.post("/sign-up", { ...details });

      router.push("/");
      dispatch(
        //@ts-ignore
        userDetailAction.setUserDetail({
          userDetail: { name: data.name, email: data.email, _id: data._id },
          isLogedIn: true,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

export const checkUserIsLogedIn = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosUserInstance.get("/");
    console.log("data", data);
    return dispatch(
      userDetailAction.setUserDetail({
        userDetail: {
          name: data.name,
          email: data.email,
          _id: data._id,
          profileImageUrl: data.profileImageUrl,
        },
        isLogedIn: true,
        isChanged: true,
      })
    );
  } catch (error) {
    dispatch(
      userDetailAction.setUserDetail({
        isLogedIn: false,
        isChanged: true,
        userDetail: null,
      })
    );
  }
};

export const loginWithGoogleWithAcessToken =
  (details: Object, router: AppRouterInstance) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosAuthInstance.post(
        "/login-with-google",
        details
      );

      dispatch(
        userDetailAction.setUserDetail({
          userDetail: {
            name: data.name,
            email: data.email,
            _id: data._id,
            profileImageUrl: data.profileImageUrl,
          },
          isLogedIn: true,
          isChanged: true,
        })
      );
      router.push("/");
    } catch (error) {}
  };
