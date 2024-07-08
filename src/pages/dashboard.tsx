import DivAnimation from "@/components/divAnimation";
import { Row } from "@/components/row";
import TitleAnimation from "@/components/titleAnimation";
import { Button } from "@/components/ui/button";
import DashboardFilter from "@/features/dashboard/dashboardFilter";
import DashboardLayout from "@/features/dashboard/dashboardLayout";
import { HiPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem]">
        <TitleAnimation>Dashboard</TitleAnimation>
        <DivAnimation className="flex gap-5 items-center">
          <Button
            className="flex gap-2"
            onClick={() => navigate("/bookings/createBooking")}
          >
            {" "}
            <HiPlus size={20} /> Add booking
          </Button>
          <DashboardFilter />
        </DivAnimation>
      </Row>
      <DashboardLayout />
    </>
  );
}

export default Dashboard;
