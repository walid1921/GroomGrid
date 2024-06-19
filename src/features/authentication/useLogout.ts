import { logout as logoutApi } from "@/api/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

export function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: logout, isPending } = useMutation({
    mutationFn: logoutApi,
    onSuccess: () => {
      queryClient.removeQueries(); // Remove all queries from the cache when the user logs out to avoid showing stale data when the user logs back in again in the future
      navigate("/login", { replace: true });
    },
  });

  return { logout, isPending };
}
