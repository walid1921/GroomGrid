import Spinner from "@/components/ui/spinner";
import { useRecentBookings } from "./useRecentBookings";
import { useRecentStays } from "./useRecentStays";
import Stats from "./stats";
import SalesChart from "./salesChart";
import Today from "../check-in-out/todayActivity";
import DivAnimation from "@/components/divAnimation";

function DashboardLayout() {
  const { bookings, isPending: isPending1, numDays } = useRecentBookings();
  const { confirmedStays, isPending: isPending2 } = useRecentStays();

  if (isPending1 || isPending2) return <Spinner />;

  const todaysBookings = bookings ?? [];
  const confirmedStaysData = confirmedStays ?? [];

  return (
    <DivAnimation className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <Stats bookings={todaysBookings} confirmedStays={confirmedStaysData} />
      <Today />
      <SalesChart bookings={todaysBookings} numDays={numDays} />
    </DivAnimation>
  );
}

export default DashboardLayout;
