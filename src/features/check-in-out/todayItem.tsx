import { format } from "date-fns";

const TodayItem = ({ activity }) => {
  const { status, clients, startTime, endTime } = activity;

  return (
    <li className="flex justify-start gap-5 items-center text-sm py-4 border-b border-gray-700 first:border-t">
      {status === "unconfirmed" && (
        <span className="text-blue-200 bg-[#267fec7d] border border-[#599ef37d] font-bold px-3 py-[5px] rounded-full">
          Arriving at {format(new Date(startTime), "p")} -{" "}
          {format(new Date(endTime), "p")}
        </span>
      )}
      {status === "checked-in" && (
        <span className="text-[#a0dfc6] bg-[#33bb8e1a] border border-[#0b6b41] font-bold px-3 py-[5px] rounded-full">
          Departing
        </span>
      )}
      <div>{clients.fullName}</div>
    </li>
  );
};

export default TodayItem;
