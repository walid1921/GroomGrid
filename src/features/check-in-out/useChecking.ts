import { updateBooking } from "@/api/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useChecking() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkin, isPending: isChecking } = useMutation({
    mutationFn: ({
      bookingId,
      product,
    }: {
      bookingId: number;
      product: { hasProduct: boolean; extrasPrice: number; totalPrice: number };
    }) =>
      updateBooking(bookingId, {
        status: "checked-in",
        isPaid: true,
        ...product,
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked in successfully!`);
      queryClient.invalidateQueries({ active: true }); // previously what we did here was to pass in the query key to invalidate the cache but we also can do it like this, this will invalidate all queries with the key active: true, its easier because we don't have to remember the key
      navigate("/"); // to navigate back to the home page
    },
    onError: (error) => {
      toast.error("Error checking in booking");
      console.error(error);
    },
  });

  return { checkin, isChecking };
}
