import { updateBooking } from "@/api/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: ({ bookingId }: { bookingId: number }) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),
    onSuccess: (data) => {
      toast.success(`Booking #${data.id} checked out successfully!`);
      // queryClient.invalidateQueries({ active: true }); // previously what we did here was to pass in the query key to invalidate the cache but we also can do it like this, this will invalidate all queries with the key active: true, its easier because we don't have to remember the key
       queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error("Error checking out booking");
      console.error(error);
    },
  });

  return { checkout, isCheckingOut };
}
