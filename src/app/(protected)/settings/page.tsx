import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";

type Props = {};

export default async function SettingsPage({}: Props) {
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut({
            redirectTo: "/auth/login",
          });
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </div>
  );
}
