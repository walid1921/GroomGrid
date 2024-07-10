import { useState } from "react";
import { Row } from "@/components/row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "@/components/ui/spinner";
import TodayItem from "./todayItem";
import { InfoHover } from "../../components/infoHover";
import { FilterByDate } from "@/components/filterByDate";

const Today = () => {
  const [date, setDate] = useState<Date | undefined>(new Date() || undefined);
  const { isPending, activities } = useTodayActivity(date);
  
  const activitiesLength = activities?.length ?? 0;

  return (
    <div className="bg-background rounded-md p-6 flex flex-col gap-4 col-span-1 pt-6 shadow-md">
      <Row className="flex-col  items-start">
        <Row className="flex-between w-full">
          <h4 className="text-lg sm:text-2xl font-semibold mb-2">Today</h4>
          <div>
            <InfoHover
              info="Total of all unconfirmed bookings. The check-in button will appear if
        the current time is greater than the start time of the booking."
            />
          </div>
         
        </Row>
        <FilterByDate date={date} setDate={setDate} />
      </Row>
      {!isPending ? (
        activitiesLength > 0 ? (
          <ul className="overflow-y-auto max-h-80">
            {activities?.map((activity) => (
              <TodayItem key={activity.id} activity={activity} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-lg font-medium mt-2">
            No Activity Today...
          </p>
        )
      ) : (
        <Spinner />
      )}
    </div>
  );
};

export default Today;
