import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/schemas";
import { getUserByEmail } from "./data/user";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validatedSchema = LoginSchema.safeParse(credentials);
        if (validatedSchema.success) {
          const { email, password } = validatedSchema.data;

          const user = await getUserByEmail(email);

          if (!user || !user.password) {
            return null;
          }

          const matchPassword = await bcrypt.compare(password, user.password);

          if (matchPassword) {
            return user;
          }
        }
        return null;
      },
    }),
    GitHub({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
} satisfies NextAuthConfig;
