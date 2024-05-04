import UserInfo from "@/components/UserInfo";
import { currentUser } from "@/lib/auth";

export default async function page() {
  const session = await currentUser();

  return <UserInfo user={session} label="Server User Info" />;
}
