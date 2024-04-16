import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

const AppLayout = () => {
  return (
    <div className="grid grid-cols-[20rem,1fr] grid-rows-[auto,1fr] h-screen">
      <Header />
      <Sidebar />
      <main className="p-16 bg-gray-50">
        <div className="max-w-[120rem] mx-0 my-auto flex flex-col gap-14">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
