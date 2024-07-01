import { useNavigate } from "react-router";
import { Button } from "./ui/button";
import Logo from "./ui/logo";
import { ModeToggle } from "./mode-toggle";
import { Link } from "react-router-dom";
import { useState } from "react";
import Hamburger from "hamburger-react";

const HeroNav = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="container py-6 flex  w-full justify-between items-center z-50">
      <div className="flex items-center gap-14 ">
        <div className="w-[12rem] pb-[0.4rem]">
          <Logo />
        </div>
        <ul className="gap-6 text-muted-foreground hidden sm:flex">
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

      <div
        className={`top-0 h-full w-[60%] ease-in-out z-50 ${
          !isOpen
            ? "fixed right-[-100%] duration-1000"
            : "fixed right-0 max-lg:block hidden duration-500"
        }`}
        onClick={toggleMenu}
      >
        <ul className="flex justify-center items-center flex-col h-full gap-20 bg-[rgba(12,12,12,0.35)] backdrop-blur-md border-l-[1px] border-neutral-700 border-bg-white/20 md:text-lg text-md">
          <Link to={"/features"} className="hover:text-white cursor-pointer ">
            Features
          </Link>
          <Link
            to={"https://github.com/walid1921/GroomGrid.git"}
            className="hover:text-white cursor-pointer "
          >
            Documentation
          </Link>
          <Button onClick={() => navigate("/login")}> Login </Button>
          <ModeToggle />
        </ul>
      </div>

      <div className="items-center gap-3 hidden md:flex">
        <Button onClick={() => navigate("/login")}> Login </Button>
        <ModeToggle />
      </div>

      <div className="flex justify-end w-full z-[999] lg:hidden">
        <div className=" inline-block sticky ">
          <Hamburger
            rounded
            color="#f5f5f5"
            size={25}
            toggled={isOpen}
            toggle={setIsOpen}
          />
        </div>
      </div>
    </nav>
  );
};

export default HeroNav;
