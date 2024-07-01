import MainAnimation from "@/components/mainAnimation";
import { Button } from "@/components/ui/button";
import LoginForm from "@/features/authentication/loginForm";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  return (
    <MainAnimation className="h-screen pb-8 pt-6 bg-background">
      <Button
        variant={"ghost"}
        size={"sm"}
        className="md:mt-6 md:ml-12 ml-4 gap-2"
        onClick={() => navigate(-1)}
      >
        {" "}
        <HiMiniChevronLeft size={20} />
        Back
      </Button>
      <div className="h-[90%] flex justify-center items-center">
        <LoginForm />
      </div>
    </MainAnimation>
  );
}

export default Login;
