import GoogleIcon from "@/components/icon/google";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { loginWithGoogleWithAcessToken } from "@/redux/actions/user-action/user-action";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
// @ts-ignore
import { LoginSocialGoogle } from "reactjs-social-login";

const LoginWithGoogle = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useAppDispatch();

  const loginWithGoogleSuccessHandler = (response: Object) => {
    dispatch(
      loginWithGoogleWithAcessToken(
        // @ts-ignore
        { acessToken: response.data.access_token },
        router
      )
    );
  };

  console.log("google client id", process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
  return (
    <div>
      <LoginSocialGoogle
        client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        onResolve={loginWithGoogleSuccessHandler}
        onReject={(err: Object) => console.log("rejct ", err)}
      >
        <Button
          variant="outline"
          type="button"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? (
            <Spinner />
          ) : (
            <GoogleIcon className="mr-2 h-4 w-4 fill-slate-50" />
          )}{" "}
          Google
        </Button>
      </LoginSocialGoogle>
    </div>
  );
};

export default LoginWithGoogle;
