import { getWorkingTime as getWorkingTimeApi } from "@/api/apiWorkingTime";
import { useQuery } from "@tanstack/react-query";

export function useWorkingTime() {
  const {
    data: workingTime,
    error,
    isPending,
  } = useQuery({
    queryKey: ["workingTime"],
    queryFn: getWorkingTimeApi,
  });

  return { workingTime, error, isPending };
}
