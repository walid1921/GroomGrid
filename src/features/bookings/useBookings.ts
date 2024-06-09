import { getBookings } from "@/api/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

type FilterMethod = "eq" | "gte" | "lte" | "neq" | "gt" | "lt";

function useBookings() {
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

  const {
    isPending,
    data: { data: bookings, count } = {},
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy, page],
    queryFn: () => getBookings({ filter, sortBy, page }),
  });

 

  return { isPending, bookings, error, count };
}

export default useBookings;
