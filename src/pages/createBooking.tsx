import DivAnimation from "@/components/divAnimation";
import { Row } from "@/components/row";
import TitleAnimation from "@/components/titleAnimation";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateBookingForm } from "@/features/bookings/createBookingForm";
import { HiPlus } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

const CreateBooking = () => {
  const navigate = useNavigate();
  return (
    <DivAnimation className="flex flex-col gap-20">
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem]">
        <TitleAnimation>Create a Booking</TitleAnimation>{" "}
        <Button className="flex gap-2" onClick={() => navigate("/clients")}>
          {" "}
          <HiPlus size={20} /> New client
        </Button>
      </Row>

      {/* <DivAnimation className="flex flex-col justify-center mx-48 border p-10 rounded-md">
        <CreateBookingForm />
      </DivAnimation> */}
      <Card className="sm:mx-[300px]">
        <CardHeader>
          <CardTitle>Password</CardTitle>
          <CardDescription>
            Change your password here. After saving, you'll be logged out.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <CreateBookingForm />
        </CardContent>
      </Card>
    </DivAnimation>
  );
};

export default CreateBooking;
