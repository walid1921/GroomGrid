import { updateService as updateServiceApi } from "@/services/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateService() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateService } = useMutation({
    mutationFn: updateServiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service"] });
      toast.success("Service updated successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while updating service");
      console.error(error);
    },
  });

  return { isUpdating, updateService };
}

export default useUpdateService;
