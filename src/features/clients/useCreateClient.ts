import { createClient as createClientApi } from "@/api/apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCreateClient() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createClient } = useMutation({
    mutationFn: createClientApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("New client added successfully");
    },
    onError: (error) => {
      toast.error(
        "An error occurred while adding client. Please make sure the email is unique."
      );
      console.error(error);
    },
  });

  return { isCreating, createClient };
}

export default useCreateClient;
