import CardWrapper from "./CardWrapper";
import FormSuccess from "../FormSuccess";
import FormError from "../FormError";
import { newVerifivation } from "@/actions/verification";

type Props = {
  token: string;
};

export default async function VerificationForm({ token }: Props) {
  const { error, success } = await newVerifivation(token);

  return (
    <CardWrapper
      headerLabel="Comfirm your Veriffication"
      backButtonHref="/auth/login"
      backButtonLabel="Back to Login"
    >
      <div className="flex w-full flex-col items-center justify-center gap-5">
        {!success && !error && (
          <div
            className="text-surface inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-sky-400 motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Verifiying...
            </span>
          </div>
        )}
        <FormSuccess message={success} />
        <FormError message={error} />
      </div>
    </CardWrapper>
  );
}
