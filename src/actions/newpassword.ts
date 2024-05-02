"use server";
import bcrypt from "bcryptjs";

import { getPasswordResetTokenByToken } from "@/data/passwordResetToken";
import { getUserByEmail } from "@/data/user";
import { NewPasswordSchema } from "@/schemas";
import { z } from "zod";
import { db } from "@/lib/db";

export const newPassword = async (
  values: z.infer<typeof NewPasswordSchema>,
  token: string,
) => {
  if (!token) {
    return { error: "Missing token!" };
  }
  const validatedField = NewPasswordSchema.safeParse(values);
  if (!validatedField.success) {
    return { error: "Invalid input!" };
  }
  const { password } = validatedField.data;
  const existingToken = await getPasswordResetTokenByToken(token);

  if (!existingToken) {
    return { error: "Invalid token!" };
  }

  const isExpired = new Date(existingToken?.expires) < new Date();

  if (isExpired) {
    return { error: "Token expired!" };
  }

  const existingUser = await getUserByEmail(existingToken?.email);

  if (!existingUser) {
    return { error: "User not found!" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: { id: existingUser.id },
    data: {
      password: hashedPassword,
    },
  });
  await db.passwordResetToken.delete({
    where: { id: existingToken.id },
  });

  return { success: "Password updated!" };
};
