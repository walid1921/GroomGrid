import { getStaysTodayActivity } from "@/api/apiBookings";
import { useQuery } from "@tanstack/react-query";

export function useTodayActivity() {
  const { isPending, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["todayActivity"],
  });

  return { isPending, activities };
}
