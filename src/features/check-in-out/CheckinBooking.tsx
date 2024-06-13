import { useMoveBack } from "../../hooks/useMoveBack";
import BookingCardInfo from "../bookings/bookingCardInfo";
import { Row } from "@/components/row";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import useBooking from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { CheckBoxConfirm } from "@/features/check-in-out/checkBoxConfirm";
import { formatCurrency } from "@/utils/helpers";
import { useChecking } from "./useChecking";

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const { booking, isPending } = useBooking();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const moveBack = useMoveBack();
  const { checkin, isChecking } = useChecking();

  function handleCheckin() {
    if (!confirmPaid) return;
    checkin(booking?.id);
  }

  if (isPending) return <Spinner />;

  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem] ">
        <div className="flex justify-between items-center w-full">
          <h1 className="flex flex-col sm:flex-row sm:gap-6 text-3xl sm:text-4xl">
            <span>{booking?.clients.fullName}</span>{" "}
            <span>Booking #{booking?.id} </span>
          </h1>
        </div>
        <div className="flex gap-4">
          <Button variant={"outline"} onClick={moveBack}>
            &larr; Back
          </Button>
        </div>
      </Row>
      <BookingCardInfo booking={booking} />
      <CheckBoxConfirm
        handleCheckin={handleCheckin}
        bookingId={booking?.id}
        clientName={booking?.clients.fullName}
        amount={formatCurrency(booking?.totalPrice)}
        checked={confirmPaid}
        onChange={() => setConfirmPaid(() => !confirmPaid)}
        id="confirm"
        disabled={confirmPaid || isChecking}
        disabledConfirm={!confirmPaid || isChecking}
      />
    </>
  );
}

export default CheckinBooking;
