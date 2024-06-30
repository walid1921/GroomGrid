import { Row } from "@/components/row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "@/components/ui/spinner";
import TodayItem from "./todayItem";

const Today = () => {
  const { isPending, activities } = useTodayActivity();

  return (
    <div className="bg-background rounded-md p-6 flex flex-col gap-4 col-span-1 pt-6 shadow-md">
      <Row>
        <h4 className="text-lg sm:text-2xl font-semibold mb-2">Today</h4>
      </Row>
      {!isPending ? (
        activities?.length > 0 ? (
          <ul className="overflow-y-auto">
            {activities.map((activity) => (
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
