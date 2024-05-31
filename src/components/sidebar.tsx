import { HiArrowCircleLeft } from "react-icons/hi";
import MainNav from "./mainNav";
import Logo from "./ui/logo";
import Uploader from "@/data/uploader";

const Sidebar = () => {
  return (
    <aside className="relative row-span-full py-[3.2rem] px-[2.4rem] bg-background border-r flex flex-col gap-16 ">
      <div className="absolute -right-[14px] top-[20px]  cursor-pointer text-[#e2e2e2] opacity-100 transition-all ease-in-out duration-300">
        <button className="hover:text-primary transition-all ease-in-out duration-200 bg-background">
          <HiArrowCircleLeft size={30} />
        </button>
      </div>
      <Logo />
      <MainNav />

      <Uploader />
    </aside>
  );
};

export default Sidebar;
