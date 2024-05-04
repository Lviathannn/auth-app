import { logout } from "@/actions/logout";

type Props = {
  children: React.ReactNode;
};

export default function LogoutButton({ children }: Props) {
  return (
    <>
      <button
        onClick={() => {
          logout();
        }}
      >
        {children}
      </button>
    </>
  );
}
