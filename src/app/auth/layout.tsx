type Props = {
  children?: React.ReactNode;
};

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-sky-400 to-blue-500">
      {children}
    </div>
  );
}
