import MainAnimation from "@/components/mainAnimation";
import { Button } from "@/components/ui/button";
import LoginForm from "@/features/authentication/loginForm";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";

function Login() {
  const navigate = useNavigate();

  return (
    <MainAnimation className="min-h-screen  bg-background">
      <Button
        variant={"ghost"}
        size={"sm"}
        className="mt-6 ml-12 gap-2"
        onClick={() => navigate(-1)}
      >
        {" "}
        <HiMiniChevronLeft size={20} />
        Back
      </Button>
      <LoginForm />
    </MainAnimation>
  );
}

export default Login;
