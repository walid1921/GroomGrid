import { getClients } from "@/api/apiClients";
import { useQuery } from "@tanstack/react-query";

function useClients() {
  const {
    isPending,
    data: { data: clients, count } = {},
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: getClients,
  });

  return { isPending, clients, error, count };
}

export default useClients;
