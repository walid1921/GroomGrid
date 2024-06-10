import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import SmallNav from "./smallNav";

const AppLayout = () => {
  return (
    <div className="sm:grid sm:grid-cols-[20rem,1fr] sm:grid-rows-[auto,1fr] h-screen">
      <Header />
      <Sidebar />
      <main className="sm:p-16 pt-10 px-6 bg-bgMain overflow-scroll w-full h-screen sm:h-auto">
        <div className="max-w-[120rem] pb-24 mx-0 my-auto flex flex-col gap-14 w-full">
          <Outlet />
          <nav className="sm:hidden flex justify-center items-center bg-[rgba(114,114,114,.2)] backdrop-blur-md   border-[rgba(114,114,114,.4)] py-2 w-[90%]  rounded-md fixed bottom-3 z-[5]">
            <SmallNav />
          </nav>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
