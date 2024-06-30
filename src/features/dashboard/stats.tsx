import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
} from "react-icons/hi2";
import Stat from "./stat";
import { formatCurrency } from "@/utils/helpers";

const Stats = ({ bookings, confirmedStays }) => {
  const numBookings = bookings?.length;

  const sales = bookings.reduce((acc, cur) => acc + cur.totalPrice, 0);

  const numCheckins = confirmedStays?.length;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase size={30} />}
        value={numBookings}
      />
      <Stat
        title="Sales"
        color="green"
        icon={<HiOutlineBanknotes size={30} />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="Check-ins"
        color="indigo"
        icon={<HiOutlineCalendarDays size={30} />}
        value={numCheckins}
      />

    </>
  );
};

export default Stats;