import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendMail = async (email: string, token: string) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Confirm your email",
    html: `
      <h1>Confirm your email</h1>
      <p>Click the link below to confirm your email</p>
      <a href="${confirmLink}">Confirm email</a>
    `,
  });
};

export const sendPasswordResetMail = async (email: string, token: string) => {
  const resetLink = `http://localhost:3000/auth/new-password?token=${token}`;

  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Reset your password",
    html: `
      <h1>Reset your password</h1>
      <p>Click the link below to reset your password</p>
      <a href="${resetLink}">Reset password</a>
    `,
  });
};

export const sendTwoFactorMail = async (email: string, token: string) => {
  await resend.emails.send({
    from: "onboarding@resend.dev",
    to: email,
    subject: "Two-factor authentication",
    html: `
      <h1>Two-factor authentication</h1>
      <p>Your two-factor authentication code is: ${token}</p>`,
  });
};
