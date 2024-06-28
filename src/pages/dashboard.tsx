import { Row } from "@/components/row";
import DashboardFilter from "@/features/dashboard/dashboardFilter";
import DashboardLayout from "@/features/dashboard/dashboardLayout";

function Dashboard() {
  return (
    <>
      <Row>
        <h1>Dashboard</h1>
        <DashboardFilter />
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
