import { deleteClient as deleteClientApi } from "@/api/apiClients";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteClient() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteClient } = useMutation({
    mutationFn: deleteClientApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Client deleted successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while deleting client");
      console.error(error);
    },
  });

  return { isDeleting, deleteClient };
}

export default useDeleteClient;
