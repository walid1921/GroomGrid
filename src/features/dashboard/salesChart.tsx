import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import {
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

// const fakeData = [
//   { label: "Jan 09", totalSales: 480, extrasSales: 20 },
//   { label: "Jan 10", totalSales: 580, extrasSales: 100 },
//   { label: "Jan 11", totalSales: 550, extrasSales: 150 },
//   { label: "Jan 12", totalSales: 600, extrasSales: 50 },
// ];

type SalesChartProps = {
  bookings: {
    created_at: string;
    totalPrice: number;
    extrasPrice: number;
    startTime: string;
  }[];

  numDays: number;
};

const SalesChart = ({ bookings, numDays }: SalesChartProps) => {
  let startDate: Date;
  let endDate: Date;

  if (numDays === 0) {
    startDate = subDays(new Date(), 1) // Start of today //! Fix this  subDays(new Date(), numDays - 2);
    endDate = new Date(); // End of today
  } else {
    startDate = subDays(new Date(), numDays - 1);
    endDate = new Date();
  }

  const allDates = eachDayOfInterval({
    start: startDate,
    end: endDate,
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.startTime)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.startTime)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  return (
    <div className="bg-background p-4 sm:p-6 rounded-lg shadow-md col-span-1 lg:col-span-2">
      <h4 className="text-lg sm:text-2xl font-semibold mb-6">
        Sales from {format(allDates[0], "MMM dd yyyy")} &mdash;{" "}
        {format(allDates[allDates.length - 1], "MMM dd yyyy")}
      </h4>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart data={data} className="">
          <XAxis dataKey="label" className="text-[10px] sm:text-sm" />
          <YAxis unit="€" className="text-[10px] sm:text-sm" />
          <Tooltip
            contentStyle={{ backgroundColor: "#1f2937", color: "#f9fafb" }}
          />
          <Area
            type="monotone"
            dataKey="totalSales"
            name="Total Sales"
            stroke="#3b83f6"
            fill="#3b83f6"
            strokeWidth={2}
            unit="€"
          />
          <Area
            type="monotone"
            dataKey="extrasSales"
            name="Extras Sales"
            stroke="#0078BD"
            fill="#0078BD"
            strokeWidth={2}
            unit="€"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
