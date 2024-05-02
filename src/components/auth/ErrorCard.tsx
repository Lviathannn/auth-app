import { Card, CardFooter, CardHeader } from "@/components/ui/card";
import BackButton from "@/components/auth/BackButton";
import Header from "@/components/auth/Header";

type Props = {};

export default function ErrorCard({}: Props) {
  return (
    <Card className="w-[400px] shadow-sm">
      <CardHeader>
        <Header label="Oops! Something went wrong!" />
      </CardHeader>
      <CardFooter>
        <BackButton href="/auth/login" label="Back to Login" />
      </CardFooter>
    </Card>
  );
}
