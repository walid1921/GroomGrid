import { getBookings } from "@/api/apiBookings";
import { PAGE_SIZE } from "@/utils/constants";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type FilterMethod = "eq" | "gte" | "lte" | "neq" | "gt" | "lt";

function useBookings() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  //! Filter
  const filterValue = searchParams.get("status") || "";
  const filter: { field: string; value: string; method: FilterMethod } | null =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue, method: "eq" }; // Default to "eq" method

  // : { field: "totalPrice", value: 5000, method: "gte"};

  //! Sort
  const sortByValue = searchParams.get("sortBy") || "startTime-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  //! Pagination
  const page = !searchParams.get("page") ? 1 : Number(searchParams.get("page"));

  //! Query
  const {
    isPending,
    data,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

  const bookings = data?.data ?? [];
  const count = data?.count ?? 0;

  //! Pre-fetching
  const pageCount = Math.ceil(count / PAGE_SIZE);

  if (page < pageCount)
    // to avoid an error loading unexcited data after the last page. it means we stop it in the last page
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page + 1],
      queryFn: () => getBookings({ filter, sortBy, page: page + 1 }),
    });

  if (page > 1)
    queryClient.prefetchQuery({
      queryKey: ["bookings", filter, sortBy, page - 1],
      queryFn: () => getBookings({ filter, sortBy, page: page - 1 }),
    });

  return { isPending, bookings, error, count };
}

export default useBookings;
