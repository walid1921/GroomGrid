import { getClients } from "@/api/apiClients";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function useClients(search: string) {
  const [searchParams] = useSearchParams(); // This hook returns an array with two values: the searchParams object and a function to update the searchParams object. We are only interested in the searchParams object, so we are using array destructuring to get the first value. This object contains all the query parameters in the URL.

  //! Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //! Query
  const {
    isPending,
    data: { data: clients, count } = {},
    error,
  } = useQuery({
    queryKey: ["clients", search, page],
    queryFn: () => getClients({ search, page }), // In this hook, we are now passing the search parameter to the getClients function, so it can be used to filter the clients based on the search query.
  });

  return { isPending, clients, error, count };
}

export default useClients;
