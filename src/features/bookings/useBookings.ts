import { getBookings } from "@/api/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";

function useBookings() {
  const [searchParams] = useSearchParams();

  //! Filter
  const filterValue = searchParams.get("status") || "";
  const filter =
    !filterValue || filterValue === "all"
      ? null
      : { field: "status", value: filterValue };
  // : { field: "totalPrice", value: 5000, method: "gte"};

  //! Sort
  const sortByValue = searchParams.get("sortBy") || "startTime-desc";
  const [field, direction] = sortByValue.split("-");
  const sortBy = { field, direction };

  const {
    isPending,
    data: bookings,
    error,
  } = useQuery({
    queryKey: ["bookings", filter, sortBy],
    queryFn: () => getBookings({ filter, sortBy }),
  });

  return { isPending, bookings, error };
}

export default useBookings;
