import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { fetcher } from "@/lib/fetcher";

const useSignOut = () => {
  const qc = useQueryClient();
  const navigate = useNavigate();
  const signout = async () => {
    await fetcher("/api/auth/logout", { method: "POST" }).catch(() => null);
    qc.invalidateQueries({ queryKey: ["user"] });
    navigate("/auth/sign-in");
  };
  return { signout };
};

export default useSignOut;
