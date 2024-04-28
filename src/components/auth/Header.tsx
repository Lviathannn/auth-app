type Props = {
  label: string;
};

export default function Header({ label }: Props) {
  return (
    <div className="flex w-full flex-col items-center justify-center gap-y-5">
      <h1 className="text-3xl font-semibold">🔐 Auth</h1>
      <p className="text-sm text-muted-foreground">{label}</p>
    </div>
  );
}
