import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// import BookingRow from "./BookingRow";
// import Table from "../../ui/Table";
import Menus from "@/components/ui/menus";
import Empty from "@/components/ui/Empty";
import { format, isToday } from "date-fns";
import useBookings from "./useBookings";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import Spinner from "@/components/ui/spinner";
import PaginationOpr from "@/components/paginationOpr";

type BookingTypes = {
  id: number;
  startTime: string;
  endTime: string;
  status: string;
  totalPrice: number;
  services: { name: string }[];
  clients: { fullName: string; email: string; phoneNumber: string }[];
};

function BookingTable() {
  const {
    bookings,
    isPending,
    error,
    count,
  }: {
    bookings: BookingTypes[] | undefined;
    isPending: boolean;
    error: Error | null;
    count: number | null | undefined;
  } = useBookings();  // It uses the useBookings hook to fetch the bookings data


  //! Conditional Rendering: Spinner, Empty, Error, and Table
  if (isPending) return <Spinner />;
  if (!bookings?.length) return <Empty resourceName="bookings" />;
  if (error)
    return (
      <p className="text-red-500 flex justify-center items-center my-[4.8rem] h-full mx-auto">
        {error.message}
      </p>
    );

  return (
    <Menus>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px] font-bold text-[15px]">
              Service
            </TableHead>
            <TableHead className="font-bold text-[15px]">Client</TableHead>
            <TableHead className="font-bold text-[15px] hidden sm:table-cell">
              Dates
            </TableHead>
            <TableHead className="font-bold text-[15px]">Status</TableHead>
            <TableHead className="text-right font-bold text-[15px]">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>

        {bookings?.map((booking) => (
          <TableBody key={booking.id}>
            <TableRow>
              <TableCell className="font-medium">
                {booking.services?.name}
              </TableCell>

              <TableCell className="flex flex-col gap-1">
                <span className="font-bold">{booking.clients.fullName}</span>
                <span className=" text-gray-400">{booking.clients.email}</span>
                <span className=" text-gray-400">
                  {booking.clients.phoneNumber}
                </span>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                <div className="flex flex-col gap-1">
                  <span>
                    {isToday(new Date(booking.startTime))
                      ? "Today"
                      : formatDistanceFromNow(booking.startTime)}
                  </span>
                  <span>
                    {format(new Date(booking.startTime), "MMM dd yyyy")} &mdash;{" "}
                    {format(new Date(booking.endTime), "MMM dd yyyy")}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                {" "}
                <span
                  className={`${
                    booking.status === "unconfirmed"
                      ? "text-blue-800 bg-blue-200 font-bold "
                      : ""
                  } ${
                    booking.status === "checked-in"
                      ? "text-green-800 bg-green-200 font-bold"
                      : ""
                  } ${
                    booking.status === "checked-out"
                      ? " text-slate-800 bg-slate-300 font-bold"
                      : ""
                  }  px-3 py-[5px] rounded-full`}
                >
                  {" "}
                  {booking.status}
                </span>
              </TableCell>
              <TableCell
                className={`${
                  booking.totalPrice > 0 ? "font-bold text-right" : ""
                }`}
              >
                {booking.totalPrice ? formatCurrency(booking.totalPrice) : "-"}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}

        <TableFooter>
          <TableRow>
            <TableCell colSpan={5} className="pt-6">
              <PaginationOpr count={count ?? 0} />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </Menus>
  );
}

export default BookingTable;
