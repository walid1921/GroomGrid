import { getClient } from "@/api/apiClients";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useClient() {
  const { clientId } = useParams();

  const {
    isPending,
    data: client,
    error,
  } = useQuery({
    queryKey: ["clients", clientId],
    queryFn: () => getClient(Number(clientId)),
    retry: false,
  });

  return { isPending, client, error };
}

export default useClient;
