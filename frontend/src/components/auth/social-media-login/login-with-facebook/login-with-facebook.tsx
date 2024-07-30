import GoogleIcon from "@/components/icon/google";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import React, { useState } from "react";
//@ts-ignore
import { LoginSocialFacebook } from "reactjs-social-login";

const LoginWithFacebook = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  return (
    <div>
      <LoginSocialFacebook
        appId="786067386078785"
        // @ts-ignore
        onResolve={(response) => console.log("res", response)}
        onReject={(err: any) => console.log("rej", err)}
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
          Facebook
        </Button>
      </LoginSocialFacebook>
    </div>
  );
};

export default LoginWithFacebook;
