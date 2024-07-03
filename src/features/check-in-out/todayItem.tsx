import { format } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import { useCheckout } from "./useCheckout";
import { Button } from "@/components/ui/button";

type ActivityType = {
  id: string;
  status: "unconfirmed" | "checked-in";
  clients: {
    fullName: string;
  };
  startTime: string;
  endTime: string;
};

type TodayItemProps = {
  activity: ActivityType;
};

const TodayItem = ({ activity }: TodayItemProps) => {
  const { id, status, clients, startTime, endTime } = activity;
  const { checkout, isCheckingOut } = useCheckout();

  const today = new Date();
  const timezoneOffset = today.getTimezoneOffset();
  today.setMinutes(today.getMinutes() - timezoneOffset);
  const todayTime = today.toISOString();


  const navigate = useNavigate();

  return (
    <li className="flex justify-start gap-2 sm:gap-2 items-center text-sm py-4 border-b border-gray-700 first:border-t">
      {status === "unconfirmed" && (
        <Link
          to={`/checkin/${id}`}
          className="text-blue-200 bg-[#267fec7d] border border-[#599ef37d] font-bold px-3 py-[5px] rounded-full text-[11px]"
        >
          Arriving at {format(new Date(startTime), "p")} -{" "}
          {format(new Date(endTime), "p")}
        </Link>
      )}
      {status === "checked-in" && (
        <span className="text-[#a0dfc6] bg-[#33bb8e1a] border border-[#0b6b41] font-bold px-3 py-[5px] rounded-full text-[11px]">
          Departing
        </span>
      )}
      <span>{clients.fullName}</span>

      {status === "unconfirmed" && startTime < todayTime && (
        <Button onClick={() => navigate(`/checkin/${id}`)} size={"sm"}>
          <span>check in</span>
        </Button>
      )}
      {status === "checked-in" && (
        <Button
          onClick={() => checkout({ bookingId: Number(id) })}
          disabled={isCheckingOut}
          size={"sm"}
          variant={`secondary`}
        >
          <span>check out</span>
        </Button>
      )}
    </li>
  );
};

export default TodayItem;
