import { login as loginApi } from "@/api/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin() {
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      navigate("/dashboard");
      toast.success("Logged in successfully");
    },
    onError: (error) => {
      toast.error("Provided email or password are incorrect");
      console.error(error);
    },
  });

  return { login, isPending };
}
