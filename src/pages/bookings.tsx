import { Row } from "@/components/row";
import FilterOperations from "@/components/filterOperations";
import SortBy from "@/components/sortBy";
import BookingTable from "@/features/bookings/bookingTable";

function Bookings() {
  return (
    <>
      <Row>
        <h1>All bookings</h1>
        <div className="flex items-center gap-4 ">
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
              { value: "startTime-desc", label: "Sort by date (recent first)" },
              { value: "startTime-asc", label: "Sort by date (earlier first)" },
              {
                value: "totalPrice-desc",
                label: "Sort by amount (high first)",
              },
              { value: "totalPrice-asc", label: "Sort by amount (low first)" },
            ]}
          />
        </div>
      </Row>

      <BookingTable />
    </>
  );
}

export default Bookings;
