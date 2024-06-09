import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="py-[1.2rem] px-[4.8rem] bg-background border-b items-center justify-between hidden sm:flex">
      <span>Header</span>
      <ModeToggle />
    </header>
  );
};

export default Header;
