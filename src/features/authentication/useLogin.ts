import { login as loginApi } from "@/api/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (response) => {
      const user = response.data.user;
      queryClient.setQueryData(["user"], user); // this part its important to, because before login when i changed the url to http://localhost:5173/ it redirect to login page, and get a user in the cache which is null, so i need to set the user in the cache after login to avoid this problem and redirect to dashboard page after login successfully 
      navigate("/dashboard", { replace: true });
    },
    onError: (error) => {
      toast.error("Provided email or password are incorrect");
      console.error(error);
    },
  });

  return { login, isPending };
}
