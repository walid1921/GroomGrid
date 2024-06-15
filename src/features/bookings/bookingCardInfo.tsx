import { BellRing } from "lucide-react";
import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";
import { format, isToday } from "date-fns";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { HiOutlineCalendarDays, HiOutlineCheckCircle } from "react-icons/hi2";
import { PiCoins } from "react-icons/pi";

type BookingCardInfoTypes = {
  booking: {
    id: number;
    created_at: string;
    startTime: string;
    endTime: string;
    numClients: number;
    servicePrice: number;
    extrasPrice: number;
    totalPrice: number;
    hasProduct: boolean;
    observations: string;
    isPaid: boolean;
    status: string;
    clients: {
      fullName: string;
      email: string;
      phoneNumber: string;
    };
    services: {
      name: string;
    };
  };
};

const BookingCardInfo = ({ booking }: BookingCardInfoTypes) => {
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
    clients: { fullName, email, phoneNumber },
    services: { name: serviceName },
  } = booking;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex text-lg sm:text-2xl sm:items-center gap-4">
          <HiOutlineCalendarDays size={30} />
          {numClients} client coming for a {serviceName}
        </CardTitle>
        <CardDescription className="text-[12px] sm:text-sm">
          {format(new Date(startTime), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startTime))
            ? "Today"
            : formatDistanceFromNow(startTime)}
          ) &mdash; {format(new Date(endTime), "EEE, MMM dd yyyy")}
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="flex sm:gap-10">
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-gray-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">{fullName}</p>
              <p className="text-sm text-muted-foreground">{email}</p>
              <p className="text-sm text-muted-foreground">{phoneNumber}</p>
            </div>
          </div>
          <div className="mb-4 grid grid-cols-[25px_1fr] items-start  last:mb-0 last:pb-0">
            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-gray-500" />
            <div className="space-y-1">
              <p className="text-sm font-medium leading-none">
                Product included?
              </p>
              <p className="text-sm text-muted-foreground">
                {hasProduct ? "Yes" : "No"}
              </p>
            </div>
          </div>
          {observations && (
            <div className="mb-4 grid grid-cols-[25px_1fr] items-start  last:mb-0 last:pb-0">
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-gray-500" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">observations</p>
                <p className="text-sm text-muted-foreground">{observations}</p>
              </div>
            </div>
          )}
        </div>
        <div className="flex flex-col sm:flex-row items-between w-full gap-10">
          <div
            className={`flex items-center flex-col sm:flex-row  justify-between rounded-md border p-4 ${
              isPaid
                ? "border-green-800  text-green-400 bg-green-900/30"
                : "border-yellow-800  text-yellow-400 bg-yellow-900/30"
            }`}
          >
            <div className="flex flex-col sm:flex-row items-center gap-3  sm:text-sm">
              <p className="flex gap-2  ">
                <PiCoins size={25} />
                Total price : {formatCurrency(totalPrice)}
              </p>
              <span>
                
                {hasProduct &&
                  ` (${formatCurrency(servicePrice)} service + ${formatCurrency(
                    extrasPrice
                  )} product)`}{" "}
              </span>
            </div>
            <span className="flex items-center gap-1 uppercase text-sm ml-4">
              <HiOutlineCheckCircle size={25} />
              {isPaid ? "Paid" : "Will pay at property"}
            </span>
          </div>
          <div className=" flex items-center space-x-4 rounded-md border p-4">
            <BellRing />
            <div className="flex-1 space-y-1">
              <p className="text-sm font-medium leading-none">
                Push Notifications
              </p>
              <p className="text-sm text-muted-foreground">
                Send notifications to device.
              </p>
            </div>
            <Switch />
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground text-right w-full">
          <p>Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default BookingCardInfo;
