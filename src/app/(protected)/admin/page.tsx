"use client";

import { admin } from "@/actions/admin";
import FormSuccess from "@/components/FormSuccess";
import RoleGate from "@/components/RoleGate";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRole } from "@/hooks/useRole";
import { UserRole } from "@prisma/client";
import { toast } from "sonner";

type Props = {};

export default function Page({}: Props) {
  const onApiRouteClick = async () => {
    try {
      const res = await fetch("/api/admin");
      if (res.ok) {
        toast.success("Allowed Access to Admin Route", {
          duration: 3000,
        });
      } else {
        toast.error("Not Allowed Access to Admin Route", {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Not Allowed Access to Admin Route", {
        duration: 3000,
      });
    }
  };

  const onServerActionClick = async () => {
    try {
      const res = await admin();
      if (res.status === 200) {
        toast.success("Allowed Access to Admin Server Action", {
          duration: 3000,
        });
      } else {
        toast.error("Not Allowed Access to Admin Server Action", {
          duration: 3000,
        });
      }
    } catch (error) {
      toast.error("Not Allowed Access to Admin Server Action", {
        duration: 3000,
      });
    }
  };

  const role = useRole();
  return (
    <Card className="w-[600px]">
      <CardHeader>
        <h1 className="text-center text-2xl font-medium">Admin Page</h1>
      </CardHeader>
      <CardContent className="space-y-4">
        <RoleGate allowedRole={UserRole.ADMIN}>
          <FormSuccess message="You are an admin" />
        </RoleGate>
        <div className="flex items-center justify-between rounded-lg p-3">
          <p className="text-sm font-medium">Admin Only Api Route</p>
          <Button onClick={onApiRouteClick}>Click to Test</Button>
        </div>
        <div className="flex items-center justify-between rounded-lg p-3">
          <p className="text-sm font-medium">Admin Only Server Actions</p>
          <Button onClick={onServerActionClick}>Click to Test</Button>
        </div>
      </CardContent>
    </Card>
  );
}
