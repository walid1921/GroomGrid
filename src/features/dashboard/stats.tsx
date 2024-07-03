import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import Stat from "./stat";
import { formatCurrency } from "@/utils/helpers";

type StatsProps = {
  bookings: {
    totalPrice: number;
    status: string;
  }[];
  confirmedStays: {
    id: number;
    totalPrice: number;
  }[];
};

const Stats = ({ bookings, confirmedStays }: StatsProps) => {
  const bookingsData = bookings?.filter(
    (booking) => booking.status === "unconfirmed"
  );

  const numBookings = bookingsData?.length;

  const numCheckins = confirmedStays?.length;
  const sales = confirmedStays.reduce((acc, cur) => acc + cur.totalPrice, 0);

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase size={30} />}
        value={numBookings}
        info="Total of unconfirmed bookings made by clients in the selected period."
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes size={30} />}
        value={formatCurrency(sales)}
        info="Total of sales made by clients in the selected period."
      />
      <Stat
        title="Check-ins"
        color="yellow"
        icon={<HiOutlineCalendarDays size={30} />}
        value={numCheckins}
        info="Total of check-ins made by clients in the selected period."
      />
    </>
  );
};

export default Stats;
