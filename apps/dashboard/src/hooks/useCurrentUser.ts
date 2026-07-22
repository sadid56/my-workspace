import { useQuery } from "@tanstack/react-query";
import { fetcher } from "@/lib/fetcher";

const useCurrentUser = ({ enabled = true }: { enabled?: boolean } = {}) => {
  const {
    data: user,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      return fetcher<any>("/api/auth/current-user").catch(() => null);
    },
    staleTime: 60 * 1000,
    enabled,
  });
  return { user, isLoading, error };
};

export default useCurrentUser;
