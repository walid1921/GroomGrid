import { deleteService as deleteServiceApi } from "@/api/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteService() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteService } = useMutation({
    mutationFn: deleteServiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service"] });
      toast.success("Service deleted successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while deleting service");
      console.error(error);
    },
  });

  return { isDeleting, deleteService };
}

export default useDeleteService;
