import Logout from "@/features/authentication/logout";
import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="py-[1.2rem] px-[1rem] sm:px-[4.8rem] bg-background border-b ">
      <div className="flex justify-end items-center gap-4">
        <Logout />
        <ModeToggle />
      </div>
    </header>
  );
};

export default Header;
