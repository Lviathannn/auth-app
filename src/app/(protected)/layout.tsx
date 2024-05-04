import { auth } from "@/auth";
import Navbar from "@/components/layouts/Navbar";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

type Props = {
  children: React.ReactNode;
};

export default async function layout({ children }: Props) {
  const session = await auth();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-5 bg-gradient-to-r from-sky-400 to-blue-500">
      <SessionProvider session={session}>
        <Navbar />
        {children}
      </SessionProvider>
      <Toaster />
    </main>
  );
}
