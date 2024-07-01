import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import Logo from "./ui/logo";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";

const HeroNav = () => {
  const navigate = useNavigate();
  return (
    <nav className="container py-6 flex justify-between items-center">
      <div className="flex items-center gap-14 ">
        <div className="w-[12rem] pb-[0.4rem]">
          <Logo />
        </div>
        <ul className="flex gap-6 text-muted-foreground">
          <Link to={"/features"} className="hover:text-white cursor-pointer ">
            Features
          </Link>
          <Link
            to={"https://github.com/walid1921/GroomGrid.git"}
            className="hover:text-white cursor-pointer "
          >
            Documentation
          </Link>
        </ul>
      </div>

      <div className="flex items-center gap-3">
        <Button onClick={() => navigate("/login")}> Login </Button>
        <ModeToggle />
      </div>
    </nav>
  );
};

export default HeroNav;
