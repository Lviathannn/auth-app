"use client";

import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import Link from "next/link";
import UserButton from "../auth/UserButton";

type Props = {};

export default function Navbar({}: Props) {
  const pathname = usePathname();
  return (
    <nav className="flex w-[600px] items-center justify-between rounded-xl bg-secondary p-4 shadow-sm">
      <div className="flex items-center gap-x-2">
        <Button
          asChild
          variant={pathname === "/settings" ? "default" : "ghost"}
        >
          <Link href="/settings">Settings</Link>
        </Button>
        <Button asChild variant={pathname === "/server" ? "default" : "ghost"}>
          <Link href="/server">Server</Link>
        </Button>
        <Button asChild variant={pathname === "/client" ? "default" : "ghost"}>
          <Link href="/client">Client</Link>
        </Button>
        <Button asChild variant={pathname === "/admin" ? "default" : "ghost"}>
          <Link href="/admin">Admin</Link>
        </Button>
      </div>
      <UserButton />
    </nav>
  );
}
