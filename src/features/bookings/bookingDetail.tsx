import { Button } from "@/components/ui/button";
import { useMoveBack } from "../../hooks/useMoveBack";
import { Row } from "@/components/row";
import useBooking from "./useBooking";
import Spinner from "@/components/ui/spinner";
import Tag from "@/components/tag";
import BookingCardInfo from "./bookingCardInfo";
import { format } from "date-fns";
import { HiArrowDownOnSquare } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function BookingDetail() {
  const { booking, isPending } = useBooking();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;

  return (
    <>
      <Row className="flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0">
        <div className="flex flex-col gap-3 items-start ">
          <div className="flex items-center gap-3">
            <h1 className="flex flex-col  text-3xl sm:text-4xl">
              Booking #{booking?.id}{" "}
            </h1>{" "}
            <Tag status={booking?.status} />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-3">
            <span className="text-md">{booking?.clients.fullName}</span>
            <span className="text-md text-muted-foreground">
              Booked{" "}
              {format(new Date(booking?.created_at), "EEE, MMM dd yyyy, p")}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {booking.status === "unconfirmed" && (
            <Button onClick={() => navigate(`/checkin/${booking?.id}`)}>
              <HiArrowDownOnSquare size={25} /> Check in
            </Button>
          )}
          <Button variant={"outline"} onClick={moveBack}>
            &larr; Back
          </Button>
        </div>
      </Row>

      <BookingCardInfo booking={booking} />
    </>
  );
}

export default BookingDetail;
