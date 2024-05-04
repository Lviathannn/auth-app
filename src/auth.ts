import NextAuth, { DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "@/auth.config";
import { db } from "@/lib/db";
import { getUserById } from "./data/user";
import { JWT } from "next-auth/jwt";
import { UserRole } from "@prisma/client";
import { getTwoFactorConfirmationByUserId } from "./data/twoFactorConfirmation";
import { getAccountByUserId } from "./data/accounts";

declare module "next-auth" {
  interface Session {
    user: {
      role: "ADMIN" | "USER";
      isTwoFactorEnabled: boolean;
      isOAuth: boolean;
    } & DefaultSession["user"];
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRole;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  events: {
    async linkAccount({ user }) {
      await db.user.update({
        where: { id: user.id },
        data: { emailVerified: new Date() },
      });
    },
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth accounts to sign in
      if (account && account.provider !== "credentials") {
        return true;
      }

      // Allow users with verified email to sign in
      const existingUser = await getUserById(user.id as string);
      if (!existingUser?.emailVerified) {
        return false;
      }

      if (existingUser?.isTwoFactorEnabled) {
        const twoFactorConfirmation = await getTwoFactorConfirmationByUserId(
          existingUser.id,
        );

        if (!twoFactorConfirmation) {
          return false;
        }

        await db.twoFactorConfirmation.delete({
          where: { id: twoFactorConfirmation.id },
        });
      }

      return true;
    },
    async session({ session, token }) {
      if (session.user) {
        if (token.sub) {
          session.user.id = token.sub;
        }
        if (token.role) {
          session.user.role = token.role;
        }

        if (token.isTwoFactorEnabled) {
          session.user.isTwoFactorEnabled = token.isTwoFactorEnabled as boolean;
        }

        if (token.name) {
          session.user.name = token.name;
        }

        if (token.email) {
          session.user.email = token.email;
        }

        session.user.isOAuth = token.isOAuth as boolean;
      }

      return session;
    },
    async jwt({ token }) {
      if (token && token.sub) {
        const user = await getUserById(token.sub);
        if (user) {
          token.role = user.role;
          token.name = user.name;
          token.email = user.email;
          token.isTwoFactorEnabled = user.isTwoFactorEnabled;

          const existingAccount = await getAccountByUserId(user?.id);

          token.isOAuth = !!existingAccount;
        }
      }

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  ...authConfig,
});
