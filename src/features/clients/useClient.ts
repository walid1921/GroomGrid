import { getClient } from "@/api/apiClients";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useClient() {
  const { clientId } = useParams(); // This hook returns an object with all the URL parameters. We are interested in the clientId parameter, so we are using object destructuring to get its value. This value will be used to fetch the client data.

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
