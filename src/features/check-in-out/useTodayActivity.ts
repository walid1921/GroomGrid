import { getStaysActivityByDate } from "@/api/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useTodayActivity(date?: Date) {
  const { isPending, data: activities } = useQuery({
    queryFn: () => getStaysActivityByDate(date),
    queryKey: ["todayActivity", date],
  });

  return { isPending, activities };
}
