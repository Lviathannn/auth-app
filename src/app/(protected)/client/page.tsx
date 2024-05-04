"use client";
import UserInfo from "@/components/UserInfo";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export default function Page() {
  const session = useCurrentUser();
  return <UserInfo user={session} label="Client User Info" />;
}
