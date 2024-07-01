import { Row } from "@/components/row";
import FilterOperations from "@/components/filterOperations";
import SortBy from "@/components/sortBy";
import useBookings from "@/features/bookings/useBookings";
import BookingTable from "@/features/bookings/bookingTable";
import TitleAnimation from "@/components/titleAnimation";
import DivAnimation from "@/components/divAnimation";

function Bookings() {
  const { bookings, count: countBookings, error, isPending } = useBookings();

  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem]">
        <TitleAnimation>
          All bookings
          <span className="font-normal text-[16px] sm:hidden ml-3">
            ({countBookings})
          </span>
        </TitleAnimation>
        <DivAnimation className="flex items-center gap-4 ">
          <FilterOperations
            filterName="status"
            options={[
              { value: "all", label: "All" },
              { value: "checked-out", label: "Checked-out" },
              { value: "checked-in", label: "Checked-in" },
              { value: "unconfirmed", label: "Unconfirmed" },
            ]}
          />
          <SortBy
            options={[
              { value: "startTime-desc", label: "Date (recent first)" },
              { value: "startTime-asc", label: "Date (earlier first)" },
              {
                value: "totalPrice-desc",
                label: "High price",
              },
              { value: "totalPrice-asc", label: "Low price" },
            ]}
          />
        </DivAnimation>
      </Row>

      <BookingTable
        /* @ts-ignore */
        bookings={bookings}
        countBookings={countBookings}
        error={error}
        isPending={isPending}
      />
    </>
  );
}

export default Bookings;
