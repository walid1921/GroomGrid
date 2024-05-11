import { updateSetting as updateSettingsApi } from "@/api/apiSettings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useUpdateSetting() {
  const queryClient = useQueryClient();

  const { isPending: isUpdating, mutate: updateSetting } = useMutation({
    mutationFn: updateSettingsApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settings"] });
      toast.success("Setting updated successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while updating setting");
      console.error(error);
    },
  });

  return { isUpdating, updateSetting };
}

export default useUpdateSetting;
