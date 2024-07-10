import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";
import SmallNav from "./smallNav";
import { Button } from "./ui/button";
import { HiPlus } from "react-icons/hi2";

const AppLayout = () => {
  const navigate = useNavigate();
  return (
    <div className="sm:grid sm:grid-cols-[20rem,1fr] sm:grid-rows-[auto,1fr] h-screen">
      <Header />
      <Sidebar />
      <main className="sm:p-16 sm:pt-10 pt-8 px-6 bg-bgMain overflow-scroll w-full h-screen sm:h-auto">
        <div className="max-w-[120rem] pb-24 mx-0 my-auto flex flex-col gap-14 w-full">
          <Outlet />
          <nav className="sm:hidden flex justify-center items-center bg-[rgba(114,114,114,.2)] backdrop-blur-md border-[rgba(114,114,114,.4)] py-2 w-[90%]  rounded-md fixed bottom-3 z-[5]">
            <SmallNav />
            <Button
              className="absolute bottom-24 right-2 "
              onClick={() => navigate("/bookings/createBooking")}
            >
              <HiPlus size={20} />
            </Button>
          </nav>
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
