"use server";
import bcrypt from "bcryptjs";

import { getUserByEmail, getUserById } from "@/data/user";
import { currentUser } from "@/lib/auth";
import { SettingSchema } from "@/schemas";
import { db } from "@/lib/db";
import { z } from "zod";
import { generateVerificationToken } from "@/lib/token";
import { sendMail } from "@/lib/mail";

export const settings = async (values: z.infer<typeof SettingSchema>) => {
  const user = await currentUser();

  if (!user) {
    return {
      error: "You must be logged in to update your settings",
    };
  }

  const dbUser = await getUserById(user.id as string);

  if (!dbUser) {
    return {
      error: "User not found",
    };
  }

  if (user.isOAuth) {
    values.email = undefined;
    values.password = undefined;
    values.newPassword = undefined;
    values.isTwoFactorEnabled = undefined;
  }

  if (values.email && values.email !== user.email) {
    const existingUser = await getUserByEmail(values.email);
    if (existingUser && existingUser.id !== user.id) {
      return {
        error: "Email is already in use !",
      };
    }

    const verificationToken = await generateVerificationToken(values.email);
    await sendMail(values.email, verificationToken.token);

    return {
      success: "A verification email has been sent to your new email address",
    };
  }

  if (values.password && values.newPassword && dbUser.password) {
    const isPasswordMatch = await bcrypt.compare(
      values.password,
      dbUser.password,
    );

    if (!isPasswordMatch) {
      return {
        error: "Password is incorrect !",
      };
    }

    const hashedPassword = await bcrypt.hash(values.newPassword, 10);
    values.password = hashedPassword;
    values.newPassword = undefined;
  }

  await db.user.update({
    where: {
      id: dbUser.id,
    },
    data: {
      ...values,
    },
  });

  return {
    success: "Settings updated successfully",
  };
};
