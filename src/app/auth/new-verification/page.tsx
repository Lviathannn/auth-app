import VerificationForm from "@/components/auth/VerificationForm";

type Props = {
  searchParams: {
    token: string;
  };
};

export default function page({ searchParams }: Props) {
  return <VerificationForm token={searchParams.token} />;
}
