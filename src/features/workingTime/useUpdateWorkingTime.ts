import { updateWorkingTime as updateWorkingTimeApi } from "@/api/apiWorkingTime";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateWorkingTime() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateTime } = useMutation({
    mutationFn: (updatedData: {
      id: number;
      data: { day: string; isOpen: boolean; start: number; end: number };
    }) => updateWorkingTimeApi(updatedData.id, updatedData.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["workingTime"] });
      toast.success("Working Time updated successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while updating working time");
      console.error(error);
    },
  });

  return { isUpdating, updateTime };
}

export default useUpdateWorkingTime;
