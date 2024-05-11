import { createService as createServiceApi } from "@/api/apiServices";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useCreateService() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createService } = useMutation({
    mutationFn: createServiceApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service"] });
      toast.success("New service added successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while adding service");
      console.error(error);
    },
  });

  return { isCreating, createService };
}

export default useCreateService;
