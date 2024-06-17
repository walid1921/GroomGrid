import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Menus from "@/components/ui/menus";
import Empty from "@/components/ui/Empty";
import { format, isToday } from "date-fns";
import useBookings from "./useBookings";
import { formatCurrency, formatDistanceFromNow } from "@/utils/helpers";
import Spinner from "@/components/ui/spinner";
import PaginationOpr from "@/components/paginationOpr";
import { HiDotsVertical, HiEye } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import Tag from "@/components/tag";
import { HiArrowDownOnSquare, HiArrowUpOnSquare } from "react-icons/hi2";
import { useCheckout } from "../check-in-out/useCheckout";
import useDeleteBooking from "./ useDeleteBooking";
import ConfirmDelete from "@/components/confirmDelete";

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
  } = useBookings(); // It uses the useBookings hook to fetch the bookings data

  const navigate = useNavigate();
  const { checkout, isCheckingOut } = useCheckout();
  const { isDeleting, deleteBooking } = useDeleteBooking();

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
            <TableHead className="text-start font-bold text-[15px]">
              Service
            </TableHead>
            <TableHead className="text-start font-bold text-[15px]">
              Client
            </TableHead>
            <TableHead className="text-start font-bold text-[15px] hidden sm:table-cell">
              Dates
            </TableHead>
            <TableHead className="text-start font-bold text-[15px]">
              Status
            </TableHead>
            <TableHead className="text-start  font-bold text-[15px]">
              Amount
            </TableHead>
          </TableRow>
        </TableHeader>

        {bookings?.map((booking) => (
          <TableBody key={booking.id}>
            <TableRow>
              <TableCell className="font-medium text-start">
                {booking.services?.name}
              </TableCell>

              <TableCell
                className="flex flex-col gap-1 cursor-pointer "
                onClick={() => navigate(`/bookings/${booking.id}`)}
              >
                <span className="text-start font-bold">
                  {booking.clients.fullName}
                </span>
                <span className="text-start text-gray-400">
                  {booking.clients.email}
                </span>
                <span className="text-start text-gray-400 ">
                  {booking.clients.phoneNumber}
                </span>
              </TableCell>
              <TableCell className="text-start hidden sm:table-cell">
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
              <TableCell className="text-start">
                <Tag status={booking.status} />
              </TableCell>
              <TableCell className="text-start">
                {booking.totalPrice ? formatCurrency(booking.totalPrice) : "-"}
              </TableCell>
              <TableCell>
                {/* ----------------------------- Menu ----------------------------- */}
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <HiDotsVertical size={25} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem
                      className="flex justify-start gap-2 w-full cursor-pointer"
                      onClick={() => navigate(`/bookings/${booking.id}`)}
                    >
                      <HiEye size={20} /> See details
                    </DropdownMenuItem>
                    {booking.status === "unconfirmed" && (
                      <DropdownMenuItem
                        className="flex justify-start gap-2 w-full cursor-pointer"
                        onClick={() => navigate(`/checkin/${booking.id}`)}
                      >
                        <HiArrowDownOnSquare size={20} /> Check in
                      </DropdownMenuItem>
                    )}
                    {booking.status === "checked-in" && (
                      <DropdownMenuItem
                        className="flex justify-start gap-2 w-full cursor-pointer"
                        onClick={() => checkout({ bookingId: booking.id })}
                        disabled={isCheckingOut}
                      >
                        <HiArrowUpOnSquare size={20} /> Check out
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />
                    <ConfirmDelete
                      id={"booking"}
                      disabled={isDeleting}
                      onConfirm={() => deleteBooking(booking.id)}
                      resourceName={booking.id}
                    />
                  </DropdownMenuContent>
                </DropdownMenu>
                {/* ----------------------------- Menu ----------------------------- */}
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
      <PaginationOpr count={count ?? 0} />
    </Menus>
  );
}

export default BookingTable;
