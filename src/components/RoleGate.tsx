import { useRole } from "@/hooks/useRole";
import { UserRole } from "@prisma/client";
import FormError from "./FormError";

type Props = {
  children: React.ReactNode;
  allowedRole: UserRole;
};

export default function RoleGate({ children, allowedRole }: Props) {
  const role = useRole();

  if (role !== allowedRole) {
    return <FormError message="Only Admin Allowed" />;
  }

  return <>{children}</>;
}
