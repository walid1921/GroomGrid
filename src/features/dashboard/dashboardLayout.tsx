import Spinner from "@/components/ui/spinner";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Stats from "./stats";
import SalesChart from "./salesChart";
import Today from "../check-in-out/todayActivity";

function DashboardLayout() {
  const { bookings, isPending: isPending1, numDays } = useRecentBookings();
  const { confirmedStays, isPending: isPending2 } = useRecentStays();

  if (isPending1 || isPending2) return <Spinner />;

  return (
    <div className="grid grid-cols-3 grid-rows-[auto_34rem_auto] gap-[2.4rem] ">
      <Stats bookings={bookings} confirmedStays={confirmedStays} />
      <Today />
      <SalesChart bookings={bookings} numDays={numDays} />
    </div>
  );
}

export default DashboardLayout;
