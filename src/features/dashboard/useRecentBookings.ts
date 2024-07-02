import { getBookingsAfterDate } from "@/api/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentBookings() {
  const [searchParams] = useSearchParams();

  const numDays = !searchParams.get("last")
    ? 0
    : Number(searchParams.get("last")!); // here it means that if the searchParams.get("last") is not null, it will be converted to a number and assigned to numDays. If it is null, 7 will be assigned to numDays. The exclamation mark is used to tell TypeScript that the value will not be null. If it is null, TypeScript will throw an error. This is called non-null assertion operator. 

  const queryDate = subDays(new Date(), numDays).toISOString(); // subDays is a function from date-fns that subtracts a number of days from a date. The function is used to get the date of the last numDays. The toISOString method is used to convert the date to a string.

  const { isPending, data: bookings } = useQuery({
    queryKey: ["bookings", `last-${numDays}`], // queryKey is an array that contains the keys used to identify the query. The keys are used to cache the query results. If the queryKey changes, the query will be re-executed. In this case, the queryKey is an array that contains two strings: "bookings" and `last-${numDays}`. The first string is used to identify the type of data being fetched, and the second string is used to identify the time period for which the data is fetched.
    queryFn: () => getBookingsAfterDate(queryDate),
  });

  return { isPending, bookings, numDays };
}
