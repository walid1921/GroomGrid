import { getServices } from "@/api/apiServices";
import { useQuery } from "@tanstack/react-query";

function useServices() {
  const {
    isPending,
    data: { data: services, count } = {},
    error,
  } = useQuery({
    queryKey: ["service"],
    queryFn: getServices,
  });

  return { isPending, services, error, count };
}

export default useServices;
