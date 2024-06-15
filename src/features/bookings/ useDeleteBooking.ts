import { deleteBooking as deleteBookingApi } from "@/api/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

function useDeleteBooking() {
  const queryClient = useQueryClient();

  const { isPending: isDeleting, mutate: deleteBooking } = useMutation({
    mutationFn: deleteBookingApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking deleted successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while deleting booking");
      console.error(error);
    },
  });

  return { isDeleting, deleteBooking };
}

export default useDeleteBooking;
