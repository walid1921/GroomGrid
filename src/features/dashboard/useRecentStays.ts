import { getStaysAfterDate } from "@/api/apiBookings";
import { useQuery } from "@tanstack/react-query";
import { subDays, startOfDay } from "date-fns";
import { useSearchParams } from "react-router-dom";

export function useRecentStays() {
  const [searchParams] = useSearchParams();

  const numDays: number = searchParams.get("last") ? Number(searchParams.get("last")!) : 0;

  let startDate: string;

  if (numDays === 0) {
    // If numDays is 0, it means "Today"
    startDate = startOfDay(new Date()).toISOString();
  } else {
    // Calculate the start date `numDays` ago
    startDate = subDays(new Date(), numDays).toISOString();
  }


  const { isPending, data: stays } = useQuery({
    queryKey: ["stays", `last-${numDays}`],
    queryFn: () => getStaysAfterDate(startDate),
  });

  const confirmedStays = stays?.filter(
    (stay) => stay.status === "checked-in" || stay.status === "checked-out"
  );

  return { isPending, confirmedStays };
}
