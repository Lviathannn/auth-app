import LoginButton from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-r from-sky-400 to-blue-500 ">
      <section className="container mx-auto flex min-h-screen items-center justify-center">
        <div className="space-y-6 text-center">
          <h1 className="text-6xl font-semibold text-white drop-shadow-sm">
            🔐 Auth
          </h1>
          <h2 className=" text-lg font-medium text-white">
            Simple authentication app <br /> with Next JS 14 and Next-Auth
          </h2>
          <div className="space-x-5">
            <LoginButton>
              <Button size="lg">Sign In</Button>
            </LoginButton>
            <Button size="lg">Register</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
