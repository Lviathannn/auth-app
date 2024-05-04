import { useCurrentUser } from "./useCurrentUser";

export const useRole = () => {
  const session = useCurrentUser();

  return session?.role;
};
