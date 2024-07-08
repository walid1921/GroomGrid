import DivAnimation from "@/components/divAnimation";
import { Row } from "@/components/row";
import TitleAnimation from "@/components/titleAnimation";
import { Button } from "@/components/ui/button";
import { CreateBookingForm } from "@/features/bookings/createBookingForm";
import { HiPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const CreateBooking = () => {
  const navigate = useNavigate();
  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem]">
        <TitleAnimation>Create a Booking</TitleAnimation>{" "}
        <Button className="flex gap-2" onClick={() => navigate("/clients")}>
          {" "}
          <HiPlus size={20} /> New client
        </Button>
      </Row>

      <DivAnimation className="mb-16">
        <CreateBookingForm />
      </DivAnimation>
    </>
  );
};

export default CreateBooking;
