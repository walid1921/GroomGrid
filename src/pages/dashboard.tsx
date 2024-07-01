import DivAnimation from "@/components/divAnimation";
import { Row } from "@/components/row";
import TitleAnimation from "@/components/titleAnimation";
import DashboardFilter from "@/features/dashboard/dashboardFilter";
import DashboardLayout from "@/features/dashboard/dashboardLayout";

function Dashboard() {
  return (
    <>
      <Row>
        <TitleAnimation>Dashboard</TitleAnimation>
        <DivAnimation className="">
          <DashboardFilter />
        </DivAnimation>
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
