/* eslint-disable @next/next/no-img-element */
"use client";

import Link from "next/link";
import config from "@/config";
import { LoginLink, useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";

// A simple button to sign in with our providers (Google & Magic Links).
// It automatically redirects user to callbackUrl (config.auth.callbackUrl) after login, which is normally a private page for users to manage their accounts.
// If the user is already logged in, it will show their profile picture & redirect them to callbackUrl immediately.
const ButtonSignin = ({
  text = "Get started",
  extraStyle,
}: {
  text?: string;
  extraStyle?: string;
}) => {
  const { user, isAuthenticated } = useKindeBrowserClient();

  if (isAuthenticated) {
    return (
      <Link
        href={config.auth.callbackUrl}
        className={`btn ${extraStyle ? extraStyle : ""}`}
      >
        {user.picture ? (
          <img
            src={user.picture}
            alt={user.given_name + " " + user.family_name || "Account"}
            className="w-6 h-6 rounded-full shrink-0"
            referrerPolicy="no-referrer"
            width={24}
            height={24}
          />
        ) : (
          <span className="w-6 h-6 bg-base-300 flex justify-center items-center rounded-full shrink-0">
            {user.given_name?.charAt(0) || user.email.charAt(0)}
          </span>
        )}
        {user.given_name || user.email || "Account"}
      </Link>
    );
  }

  return (
    <LoginLink
      className={`btn ${extraStyle ? extraStyle : ""}`}
      authUrlParams={{ lang: "de" }}
    >
      {text}
    </LoginLink>
  );
};

export default ButtonSignin;
