import CardWrapper from "@/components/auth/CardWrapper";

type Props = {};

export default function LoginForm({}: Props) {
  return (
    <CardWrapper
      headerLabel="Welcome Back"
      backButtonLabel="Dont have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      Login Form
    </CardWrapper>
  );
}
