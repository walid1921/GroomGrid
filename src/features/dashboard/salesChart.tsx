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
//   { label: "Jan 13", totalSales: 700, extrasSales: 150 },
//   { label: "Jan 14", totalSales: 800, extrasSales: 150 },
//   { label: "Jan 15", totalSales: 700, extrasSales: 200 },
//   { label: "Jan 16", totalSales: 650, extrasSales: 200 },
//   { label: "Jan 17", totalSales: 600, extrasSales: 300 },
//   { label: "Jan 18", totalSales: 550, extrasSales: 100 },
//   { label: "Jan 19", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 20", totalSales: 800, extrasSales: 200 },
//   { label: "Jan 21", totalSales: 700, extrasSales: 100 },
//   { label: "Jan 22", totalSales: 810, extrasSales: 50 },
//   { label: "Jan 23", totalSales: 950, extrasSales: 250 },
//   { label: "Jan 24", totalSales: 970, extrasSales: 100 },
//   { label: "Jan 25", totalSales: 900, extrasSales: 200 },
//   { label: "Jan 26", totalSales: 950, extrasSales: 300 },
//   { label: "Jan 27", totalSales: 850, extrasSales: 200 },
//   { label: "Jan 28", totalSales: 900, extrasSales: 100 },
//   { label: "Jan 29", totalSales: 800, extrasSales: 300 },
//   { label: "Jan 30", totalSales: 950, extrasSales: 200 },
//   { label: "Jan 31", totalSales: 1100, extrasSales: 300 },
//   { label: "Feb 01", totalSales: 1200, extrasSales: 400 },
//   { label: "Feb 02", totalSales: 1250, extrasSales: 300 },
//   { label: "Feb 03", totalSales: 1400, extrasSales: 450 },
//   { label: "Feb 04", totalSales: 1500, extrasSales: 500 },
//   { label: "Feb 05", totalSales: 1400, extrasSales: 600 },
//   { label: "Feb 06", totalSales: 1450, extrasSales: 400 },
// ];

const SalesChart = ({ bookings, numDays }) => {
  const allDates = eachDayOfInterval({
    start: subDays(new Date(), numDays - 1),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((booking) => isSameDay(date, new Date(booking.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  return (
    <div className="col-span-2 bg-background p-6 rounded-lg shadow">
      <h2 className="text-lg font-semibold  mb-6">
        Sales from {format(allDates.at(0), "MMM dd yyyy")} &mdash; {format(allDates.at(-1), "MMM dd yyyy")}
      </h2>
      <ResponsiveContainer width="100%" height={400}>
        <AreaChart
          data={data}
          width={500}
          height={400}
          margin={{
            top: 10,
            right: 30,
            left: 0,
            bottom: 0,
          }}
        >
          <XAxis dataKey="label" />
          <YAxis unit={"€"} />
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
            stroke="#10B981"
            fill="#10B981"
            strokeWidth={2}
            unit="€"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SalesChart;
