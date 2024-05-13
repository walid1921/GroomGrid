import { ModeToggle } from "./mode-toggle";

const Header = () => {
  return (
    <header className="py-[1.2rem] px-[4.8rem] bg-background border-b flex items-center justify-between">
      <span>Header</span>
      <ModeToggle />
    </header>
  );
};

export default Header;
