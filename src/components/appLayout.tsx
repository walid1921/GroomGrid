import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import SmallNav from "./smallNav";

const AppLayout = () => {
  return (
    <div className="grid sm:grid-cols-[20rem,1fr] grid-rows-[auto,1fr] h-screen">
      <Header />
      <Sidebar />
      <main className="sm:p-16 pt-[30px] px-6 bg-bgMain overflow-scroll h-screen sm:h-auto">
        <div className="max-w-[120rem] mx-0 my-auto flex flex-col gap-14">
          <nav className="sm:hidden flex justify-center bg-background py-2 rounded-md">
            <SmallNav />
          </nav>
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
