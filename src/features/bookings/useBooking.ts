import { getBooking } from "@/api/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

function useBooking() {
  const { bookingId } = useParams();

  const {
    isPending,
    data: booking,
    error,
  } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(Number(bookingId)),
    retry: false,
  });

  return { isPending, booking, error };
}

export default useBooking;
