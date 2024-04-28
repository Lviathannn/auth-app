"use client";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

type Props = {};

export default function Social({}: Props) {
  return (
    <div className="flex w-full items-center gap-x-2 ">
      <Button size="lg" className="w-full">
        <FcGoogle className="size-5" />
      </Button>
      <Button size="lg" className="w-full">
        <FaGithub className="size-5" />
      </Button>
    </div>
  );
}
