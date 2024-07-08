import { createBooking as createBookingApi } from "@/api/apiBookings";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

type Booking = {
  serviceId: number;
  clientId: number;
  startTime: string;
  endTime: string;
  hasProduct: boolean;
  observations: string;
  isPaid: boolean;
  status: string;
  servicePrice: number;
  extrasPrice: number;
  totalPrice: number;
};

function useCreateClient() {
  const queryClient = useQueryClient();

  const { mutate: createBooking, isPending : isCreating } = useMutation({
    mutationFn: (obg: Booking) => createBookingApi(obg),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("New booking added successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while adding booking");
      console.error(error);
    },
  });

  return { createBooking, isCreating };
}

export default useCreateClient;
