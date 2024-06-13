import { Button } from "@/components/ui/button";
import { useMoveBack } from "../../hooks/useMoveBack";
import { Row } from "@/components/row";
import useBooking from "./useBooking";
import Spinner from "@/components/ui/spinner";
import Tag from "@/components/tag";
import BookingCardInfo from "./bookingCardInfo";

function BookingDetail() {
  const { booking, isPending } = useBooking();

  const moveBack = useMoveBack();

  if (isPending) return <Spinner />;

  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem] ">
        <div className="flex justify-between items-center w-full">
          <h1 className="flex flex-col sm:flex-row sm:gap-6 text-3xl sm:text-4xl">
          Booking #{booking?.id} <span className="text-[20px]">{booking?.clients.fullName}</span>
          </h1>
          <Tag status={booking?.status} />
        </div>
        <Button variant={"outline"} onClick={moveBack}>
          &larr; Back
        </Button>
      </Row>

      <BookingCardInfo booking={booking} />
    </>
  );
}

export default BookingDetail;
