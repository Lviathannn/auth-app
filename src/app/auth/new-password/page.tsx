import NewPassword from "@/components/auth/NewPassword";

type Props = {
  searchParams: {
    token: string;
  };
};

export default function page({ searchParams }: Props) {
  return <NewPassword token={searchParams.token} />;
}
