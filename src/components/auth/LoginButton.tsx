"use client";

import { useRouter } from "next/navigation";

type Props = {
  children?: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
};

export default function LoginButton({
  children,
  mode = "redirect",
  asChild,
}: Props) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/auth/login");
  };

  if (mode === "modal") {
    return <span>Implement Model</span>;
  }

  return (
    <span className="cursor-pointer" onClick={handleClick}>
      {children}
    </span>
  );
}
