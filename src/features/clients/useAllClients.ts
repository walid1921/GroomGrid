import { getAllClients } from "@/api/apiClients";
import { useQuery } from "@tanstack/react-query";

function useAllClients() {
  const { isPending, data: clients, error } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getAllClients(),
  });

  return { isPending, clients, error };
}

export default useAllClients;
