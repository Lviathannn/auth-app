"use client";
import { Button } from "@/components/ui/button";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { signIn } from "next-auth/react";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type Props = {};

export default function Social({}: Props) {
  const handleClick = (provider: "google" | "github") => {
    signIn(provider, { callbackUrl: DEFAULT_LOGIN_REDIRECT });
  };

  return (
    <div className="flex w-full items-center gap-x-2 ">
      <Button
        size="lg"
        className="w-full"
        variant="secondary"
        onClick={() => handleClick("google")}
      >
        <FcGoogle className="size-5" />
      </Button>
      <Button
        size="lg"
        className="w-full"
        variant="secondary"
        onClick={() => handleClick("github")}
      >
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
}
