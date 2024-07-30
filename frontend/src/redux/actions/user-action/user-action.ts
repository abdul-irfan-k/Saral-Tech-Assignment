import { axiosUserInstance } from "@/constants/axios";
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
      const { data } = await axiosUserInstance.post("/sign-in", { ...details });
      router.push("/");
      dispatch(
        userDetailAction.setUserDetail({
          userDetail: { name: data.name, email: data.email },
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
      const { data } = await axiosUserInstance.post("/sign-up", { ...details });

      router.push("/");
      dispatch(
        userDetailAction.setUserDetail({
          userDetail: { name: data.name, email: data.email },
          isLogedIn: true,
        })
      );
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // const { isValid, errorType, errorMessage } = error.response?.data;
        // dispatch(
        //   userSignUpAction.setUserSignUpError({
        //     error: errorType,
        //     errorMessage,
        //   })
        // );
        return console.log(error);
      }
      console.log(error);
    }
  };

export const checkUserIsLogedIn = () => async (dispatch: AppDispatch) => {
  try {
    const { data } = await axiosUserInstance.post("/getUserDetail");
    console.log("data", data);
    return dispatch(
      userDetailAction.setUserDetail({
        userDetail: {
          name: data.name,
          email: data.email,
          userId: data.userId,
          _id: data._id,
          profileImageUrl: data.profileImageUrl,
        },
        isLogedIn: true,
        isChanged: true,
      })
    );
  } catch (error) {
    dispatch(
      userDetailAction.setUserDetail({ isLogedIn: false, isChanged: true })
    );
  }
};

export const loginWithGoogleWithAcessToken =
  (details: Object, router: AppRouterInstance) =>
  async (dispatch: AppDispatch) => {
    try {
      const { data } = await axiosUserInstance.post(
        "/login-with-google",
        details
      );

      dispatch(
        userDetailAction.setUserDetail({
          userDetail: {
            name: data.name,
            email: data.email,
            userId: data.userId,
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

export const userIntialSettingSetupHandler = async (
  data: Object,
  router: AppRouterInstance
) => {
  try {
    const { data: response } = await axiosUserInstance.post(
      "/gettingStartedSettingSetup",
      data
    );
    if (response.isUpdated) {
      router.push("/messenger");
    }
  } catch (error) {}
};
