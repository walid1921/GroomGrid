import { getServices } from "@/api/apiServices";
import { useQuery } from "@tanstack/react-query";

function useServices() {
  const {
    isPending,
    data: services,
    error,
  } = useQuery({
    queryKey: ["service"],
    queryFn: getServices,
  });

  return { isPending, services, error };
}

export default useServices;
