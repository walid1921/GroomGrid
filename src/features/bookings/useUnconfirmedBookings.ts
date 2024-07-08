import { getUnconfirmedBookings } from "@/api/apiBookings";
import { useQuery } from "@tanstack/react-query";

function useUnconfirmedBookings() {
  const {
    isPending,
    data: unconfirmedBookings,
    error,
  } = useQuery({
    queryKey: ["bookings"],
    queryFn: () => getUnconfirmedBookings(),
  });

  return { isPending, unconfirmedBookings, error };
}

export default useUnconfirmedBookings;
