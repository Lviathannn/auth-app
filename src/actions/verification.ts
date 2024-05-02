"use server";

import { getUserByEmail } from "@/data/user";
import { getVerificationToken } from "@/data/token";
import { db } from "@/lib/db";

export const newVerifivation = async (token: string) => {
  const existingToken = await getVerificationToken(token);

  if (!existingToken) {
    return {
      error: "Token does not exist!",
    };
  }

  const hasExpired = new Date() > new Date(existingToken.expires);
  const existingUser = await getUserByEmail(existingToken.email);

  if (hasExpired) {
    await db.verificationToken.delete({
      where: {
        id: existingToken.id,
      },
    });

    return {
      error: "Token has expired!",
    };
  }

  if (!existingUser) {
    return {
      error: "Email does not exist!",
    };
  }

  await db.user.update({
    where: {
      id: existingUser.id,
    },
    data: {
      emailVerified: new Date(),
      email: existingToken.email,
    },
  });

  await db.verificationToken.delete({
    where: {
      id: existingToken.id,
    },
  });

  return {
    success: "Email verified!",
  };
};
