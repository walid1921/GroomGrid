import { updateUser as updateUserApi } from "@/api/apiAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: ({ user }) => {
      queryClient.setQueryData(["user"], user);
      // queryClient.invalidateQueries({
      //   queryKey: ["user"],
      // });
      toast.success("User updated successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while updating user");
      console.error(error);
    },
  });

  return { isUpdating, updateUser };
}

export default useUpdateUser;
