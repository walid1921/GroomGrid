import Logout from "@/features/authentication/logout";
import { ModeToggle } from "./mode-toggle";
import Logo from "./ui/logo";

const Header = () => {
  return (
    <header className="py-[1.2rem] px-[1rem] sm:px-[4.8rem] bg-background border-b flex justify-between items-center ">
      <div className="w-64 sm:hidden">
        <Logo />
      </div>

      <div className="flex justify-end items-center gap-4 w-full">
        <Logout />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
