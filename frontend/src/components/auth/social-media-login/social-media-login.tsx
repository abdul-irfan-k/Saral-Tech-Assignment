import GoogleIcon from "@/components/icon/google";
import React from "react";
import LoginWithGoogle from "./login-with-google/login-with-google";
import LoginWithFacebook from "./login-with-facebook/login-with-facebook";

const SocialMediaLogin = () => {
  return (
    <div className="gap-2 flex flex-col">
      <LoginWithGoogle />
      <LoginWithFacebook />
    </div>
  );
};

export default SocialMediaLogin;
