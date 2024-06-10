import { Button } from "@/components/ui/button";
import { useMoveBack } from "../../hooks/useMoveBack";
import { Row } from "@/components/row";
import useBooking from "./useBooking";
import Spinner from "@/components/ui/spinner";
import Tag from "@/components/tag";
import BookingDataBox from "./bookingDataBox";

function BookingDetail() {
  const { booking, isPending } = useBooking();

  const moveBack = useMoveBack();

  if (isPending) return <Spinner />;

  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem]">
        <div className="flex gap-4 items-center">
          <h1>Booking #{booking?.id}</h1>
          <Tag status={booking?.status} />
        </div>
        <Button onClick={moveBack}>&larr; Back</Button>
      </Row>

      <BookingDataBox booking={booking} />

      {/* <ButtonGroup>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup> */}
    </>
  );
}

export default BookingDetail;
