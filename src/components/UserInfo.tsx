import { ExtendedUser } from "@/types/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";

type Props = {
  user?: ExtendedUser;
  label: string;
};

export default function UserInfo({ user, label }: Props) {
  return (
    <Card className="w-[600px] shadow-sm">
      <CardHeader>
        <p className="text-center text-xl font-medium">{label}</p>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between rounded-lg p-3">
          <p>ID</p>
          <p className="max-w-[180px] truncate text-xs">{user?.id}</p>
        </div>
        <div className="flex items-center justify-between rounded-lg p-3">
          <p>Username</p>
          <p className="max-w-[180px] truncate text-xs">{user?.name}</p>
        </div>
        <div className="flex items-center justify-between rounded-lg p-3">
          <p>Email</p>
          <p className="max-w-[180px] truncate text-xs">{user?.email}</p>
        </div>
        <div className="flex items-center justify-between rounded-lg p-3">
          <p>Role</p>
          <p className="max-w-[180px] truncate text-xs">{user?.role}</p>
        </div>
        <div className="flex items-center justify-between rounded-lg p-3">
          <p>Two Factor Authentication</p>
          <p className="max-w-[180px] truncate text-xs">
            {user?.isTwoFactorEnabled ? "Enabled" : "Disabled"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
