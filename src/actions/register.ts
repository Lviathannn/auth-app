"use server";
import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/token";
import { sendMail } from "@/lib/mail";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid fields!",
    };
  } else {
    const { email, password, name } = validatedFields.data;
    const hashedPassword = await bcrypt.hash(password, 10);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return {
        error: "User already exists!",
      };
    } else {
      await db.user.create({
        data: {
          email,
          name,
          password: hashedPassword,
        },
      });

      const verificationToken = await generateVerificationToken(email);
      await sendMail(verificationToken.email, verificationToken.token);

      return {
        success: "Confirmation email sent! ",
      };
    }
  }
};
