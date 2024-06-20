import { signup as signupApi } from "@/api/apiAuth";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      toast.success(
        "User signed up! Please check your email to verify your account"
      );
    },
    onError: (error) => {
      console.error(error);
      toast.error("An error occurred while signing up");
    },
  });

  return { signup, isPending };
}

export default useSignup;
