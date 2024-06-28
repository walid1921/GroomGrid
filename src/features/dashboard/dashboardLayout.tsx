import Spinner from "@/components/ui/spinner";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";

function DashboardLayout() {
  const { bookings, isPending: isPending1 } = useRecentBookings();
  const { stays, confirmedStays, isPending: isPending2 } = useRecentStays();

  if (isPending1 || isPending2) return <Spinner />;

  console.log(bookings);

  return (
    <div className="grid grid-cols-4 grid-rows-[auto_34rem_auto] gap-[2.4rem] ">
      <div>Statistics</div>
      <div>Today's activity</div>
      <div>Chart stay duration</div>
      <div>Chart sales</div>
    </div>
  );
}

export default DashboardLayout;
