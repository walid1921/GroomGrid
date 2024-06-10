import { format, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCheckCircle,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

function BookingDataBox({ booking }) {
  const {
    created_at,
    startTime,
    endTime,
    numClients,
    servicePrice,
    extrasPrice,
    totalPrice,
    hasProduct,
    observations,
    isPaid,
    clients: { fullName: guestName, email, phoneNumber },
    services: { name: serviceName },
  } = booking;

  return (
    <section className="bg-gray-50 border border-gray-100 rounded-md overflow-hidden">
      <header className="bg-brand-500 p-8 text-indigo-200 text-lg font-medium flex items-center justify-between">
        <div className="flex items-center gap-4 font-semibold text-lg">
          <HiOutlineHomeModern className="h-8 w-8" />
          <p>
            {numClients} clients in Service{" "}
            <span className="font-sono text-2xl ml-1">{serviceName}</span>
          </p>
        </div>
        <p>
          {format(new Date(startTime), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startTime))
            ? "Today"
            : formatDistanceFromNow(startTime)}
          ) &mdash; {format(new Date(endTime), "EEE, MMM dd yyyy")}
        </p>
      </header>

      <section className="p-8 pb-3">
        <div className="flex items-center gap-3 mb-4 text-gray-500">
          <p className="font-semibold text-gray-700">{guestName}</p>
          <span>&bull;</span>
          <p>{email}</p>
          <span>&bull;</span>
          <p>phone Number: {phoneNumber}</p>
        </div>

        {observations && (
          <div>
            <HiOutlineChatBubbleBottomCenterText />
            observations :{observations}
          </div>
        )}

        <div>
          Product included?
          <HiOutlineCheckCircle />
          {hasProduct ? "Yes" : "No"}
        </div>

        <div
          className={`flex items-center justify-between p-4 rounded-md mt-6 ${
            isPaid
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          <div>
            Total price
            <HiOutlineCurrencyDollar />
            {formatCurrency(totalPrice)}
            {hasProduct &&
              ` (${formatCurrency(servicePrice)} service + ${formatCurrency(
                extrasPrice
              )} product)`}
          </div>
          <p className="uppercase text-sm font-semibold">
            {isPaid ? "Paid" : "Will pay at property"}
          </p>
        </div>
      </section>

      <footer className="p-4 text-sm text-gray-500 text-right">
        <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
      </footer>
    </section>
  );
}

export default BookingDataBox;
