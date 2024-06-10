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
    queryKey: ["booking"],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  console.log(booking);

  return { isPending, booking, error };
}

export default useBooking;
