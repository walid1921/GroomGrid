import { getClients } from "@/api/apiClients";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function useClients(search: string) {
  const [searchParams] = useSearchParams();

  //! Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //! Query
  const {
    isPending,
    data: { data: clients, count } = {},
    error,
  } = useQuery({
    queryKey: ["clients", search, page],
    queryFn: () => getClients({ search, page }),
  });

  return { isPending, clients, error, count };
}

export default useClients;
