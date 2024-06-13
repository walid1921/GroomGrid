import { useMoveBack } from "../../hooks/useMoveBack";
import BookingCardInfo from "../bookings/bookingCardInfo";
import { Row } from "@/components/row";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import useBooking from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { CheckBoxConfirm } from "@/features/check-in-out/checkBoxConfirm";
import { useChecking } from "./useChecking";
import UseSettings from "../settings/useSettings";

function CheckinBooking() {
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addProduct, setAddProduct] = useState(false);

  const { booking, isPending } = useBooking();
  const { id : bookingId,
    totalPrice,
    
  } = booking;
  const { settings, isLoading: isLoadingSettings } = UseSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const moveBack = useMoveBack();

  const { checkin, isChecking } = useChecking();

  

  if (isPending || isLoadingSettings) return <Spinner />;

  //! Calculate the price of the product
  const optionalProductPrice = settings?.productPrice;

  function handleCheckin() {
    if (!confirmPaid) return;
    if (addProduct) {
      checkin({bookingId, product: { hasProduct: true, extrasPrice: optionalProductPrice, totalPrice : totalPrice + optionalProductPrice}});
    } else {
      checkin(booking?.id);
    }
  }

  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem] ">
        <div className="flex justify-between items-center w-full">
          <h1 className="flex flex-col sm:flex-row sm:gap-2 text-3xl sm:text-4xl">
            Check in &rarr; Booking #{booking?.id}
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
        amount={booking?.totalPrice}
        checked={confirmPaid}
        onChange={() => setConfirmPaid(() => !confirmPaid)}
        disabled={confirmPaid || isChecking}
        disabledConfirm={!confirmPaid || isChecking}
        onChangeProduct={() => {
          setAddProduct(() => !addProduct);
          setConfirmPaid(false); // if the client wants to add a product we need to uncheck the confirmPaid checkbox even if the client has already paid
        }}
        checkedProduct={addProduct}
        hasProduct={booking?.hasProduct}
        optionalProductPrice={optionalProductPrice}
      />
    </>
  );
}

export default CheckinBooking;
