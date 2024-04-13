import { Outlet } from "react-router-dom";
import Sidebar from "./sidebar";
import Header from "./header";

const AppLayout = () => {
  return (
    <div className="grid grid-cols-[20rem,1fr] grid-rows-[auto,1fr] h-screen">
      <Header />
      <Sidebar />
      <main className="p-16 bg-gray-50">
        <Outlet />
      </main>
    </div>
  );
};

export default AppLayout;
