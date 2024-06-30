import { Row } from "@/components/row";
import { useTodayActivity } from "./useTodayActivity";
import Spinner from "@/components/ui/spinner";
import TodayItem from "./todayItem";

const Today = () => {
  const { isPending, activities } = useTodayActivity();

  return (
    <div className="bg-background rounded-md p-8 flex flex-col gap-6 col-span-1 pt-6">
      <Row>
        <h2>Today Activities</h2>
      </Row>

      {!isPending ? (
        activities?.length > 0 ? (
          <ul className="overflow-scroll overflow-x-hidden scrollbar-none">
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
