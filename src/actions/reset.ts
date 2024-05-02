"use server";

import { getUserByEmail } from "@/data/user";
import { sendPasswordResetMail } from "@/lib/mail";
import { generateResetPasswordToken } from "@/lib/token";
import { ResetSchema } from "@/schemas";
import { z } from "zod";

export const reset = async (values: z.infer<typeof ResetSchema>) => {
  const validatedFields = ResetSchema.safeParse(values);

  if (!validatedFields.success) {
    return {
      error: "Invalid Email",
    };
  }

  const { email } = validatedFields.data;
  const existingUser = await getUserByEmail(email);
  if (!existingUser) {
    return {
      error: "User not found",
    };
  }

  // Send email with reset link
  const passwordResetToken = await generateResetPasswordToken(email);
  await sendPasswordResetMail(
    passwordResetToken.email,
    passwordResetToken.token,
  );

  return {
    success: "Email sent with reset link",
  };
};
