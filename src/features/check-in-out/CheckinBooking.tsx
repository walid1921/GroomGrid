import { useMoveBack } from "../../hooks/useMoveBack";
import BookingCardInfo from "../bookings/bookingCardInfo";
import { Row } from "@/components/row";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/spinner";
import useBooking from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { CheckBoxConfirm } from "@/features/check-in-out/checkBoxConfirm";
import UseSettings from "../settings/useSettings";
import UpdateSettingsForm from "../settings/UpdateSettingsForm";
import { format } from "date-fns";
import { useChecking } from "./useChecking";

function CheckinBooking() {
  const moveBack = useMoveBack();

  const [confirmPaid, setConfirmPaid] = useState(false);
  const [addProduct, setAddProduct] = useState(false);

  const { booking, isPending } = useBooking();
  const { settings, isLoading: isLoadingSettings } = UseSettings();

  useEffect(() => {
    setConfirmPaid(booking?.isPaid ?? false);
  }, [booking?.isPaid]);

  const { checkin, isChecking } = useChecking();

  //! Calculate the price of the product
  const optionalProductPrice = settings?.productPrice;

  if (isPending || isLoadingSettings) return <Spinner />;

  function handleCheckin() {
    if (!confirmPaid) return;

    const product = addProduct
      ? {
          hasProduct: true,
          extrasPrice: optionalProductPrice,
          totalPrice: booking.totalPrice + optionalProductPrice,
        }
      : {
          hasProduct: false,
          extrasPrice: 0,
          totalPrice: booking.totalPrice,
        };

    checkin({
      bookingId: booking.id,
      product,
    });
    console.log({
        bookingId: Number(booking.id),
        product,
      });
  }

  return (
    <>
      <Row className="flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0">
        <div className="flex flex-col gap-3 items-start ">
          <h1 className="flex flex-col sm:flex-row sm:gap-2 text-3xl sm:text-4xl">
            Check in &rarr; Booking #{booking?.id}
          </h1>

          <div className="flex flex-col sm:flex-row items-start sm:items-center sm:gap-3">
            <span className="text-md">{booking?.clients.fullName}</span>
            <span className="text-md text-muted-foreground">
              Booked{" "}
              {format(new Date(booking?.created_at), "EEE, MMM dd yyyy, p")}
            </span>
          </div>
        </div>
        <div className="flex gap-4">
          <Button variant={"outline"} onClick={moveBack}>
            &larr; Back
          </Button>
        </div>
      </Row>
      <BookingCardInfo booking={booking} />
      <UpdateSettingsForm />
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
