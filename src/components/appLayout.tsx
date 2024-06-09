import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import SmallNav from "./smallNav";

const AppLayout = () => {
  return (
    <div className="grid sm:grid-cols-[20rem,1fr] grid-rows-[auto,1fr] h-screen">
      <Header />
      <Sidebar />
      <main className="sm:p-16 pt-[120px] px-6 bg-bgMain overflow-scroll h-screen sm:h-auto">
        <div className="max-w-[120rem] mx-0 my-auto flex flex-col gap-14">
          <nav className="sm:hidden flex justify-center bg-[rgba(114,114,114,.2)] backdrop-blur-md   border-[rgba(114,114,114,.4)] py-2 px-5 rounded-md fixed top-3 z-[1000]">
            <SmallNav />
          </nav>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
