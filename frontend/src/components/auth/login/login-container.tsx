"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";
import React, { useState } from "react";
import GoogleIcon from "@/components/icon/google";
import { Button } from "@/components/ui/button";
import SocialMediaLogin from "../social-media-login/social-media-login";
import { useAppDispatch } from "@/redux/store";
import { useRouter } from "next/navigation";
import { loginHandler } from "@/redux/actions/user-action/user-action";

const LoginContainer = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const onSubmitHandler = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  };

  const router = useRouter();
  const dispatch = useAppDispatch();
  const [userDetail, setUserDetail] = useState({ email: "", password: "" });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setUserDetail({ ...userDetail, [e.target.name]: e.target.value });

  const loginButtonHandler = () => {
    dispatch(loginHandler({ ...userDetail }, router));
  };
  return (
    <div className={cn("grid gap-6")}>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            Email
          </Label>
          <Input
            id="email"
            placeholder="name@example.com"
            type="email"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            disabled={isLoading}
            name="email"
            onChange={inputChangeHandler}
          />
        </div>
        <div className="grid gap-1">
          <Label className="sr-only" htmlFor="email">
            password
          </Label>
          <Input
            id="password"
            placeholder="Enter password"
            type="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off"
            disabled={isLoading}
            name="password"
            onChange={inputChangeHandler}
          />
        </div>

        <Button disabled={isLoading} onClick={loginButtonHandler}>
          {isLoading && <Spinner className="mr-2 h-4 w-4 animate-spin" />}
          Sign In with Email
        </Button>
      </div>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>

      <SocialMediaLogin />
    </div>
  );
};

export default LoginContainer;
