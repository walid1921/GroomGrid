import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineScissors,
  HiOutlineUserGroup,
  HiOutlineUsers,
} from "react-icons/hi2";
import useServices from "@/features/services/useServices";
import useBookings from "@/features/bookings/useBookings";
import useClients from "@/features/clients/useClients";

//! navLinks
const navLinks = [
  {
    name: "Dashboard",
    icon: HiOutlineHome,
    to: "/dashboard",
  },
  {
    name: "Bookings",
    icon: HiOutlineCalendarDays,
    to: "/bookings",
  },
  {
    name: "Services",
    icon: HiOutlineScissors,
    to: "/services",
  },
  {
    name: "Clients",
    icon: HiOutlineUserGroup,
    to: "/clients",
  },
  {
    name: "Users",
    icon: HiOutlineUsers,
    to: "/users",
  },
  {
    name: "Settings",
    icon: HiOutlineCog6Tooth,
    to: "/settings",
  },
];

export default function MainNav() {
  const { count: countServices } = useServices();
  const { count: countBookings } = useBookings();
  const { count: countClients } = useClients(""); // We are not using the search parameter here because we want to get the total number of clients, regardless of the search query. thats why we are passing an empty string to the useClients hook. This way, the search parameter will be ignored and all clients will be returned.

  return (
    <nav>
      <ul className="flex flex-col gap-7">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className="flex items-center gap-3 hover:bg-bgMain hover:rounded-md py-2 px-4 "
            >
              <link.icon size={25} />
              <div className="text-[14px] flex justify-between items-center w-full">
                {link.name}

                {link.name === "Services" && <span>{countServices}</span>}
                {link.name === "Clients" && <span>{countClients}</span>}

                {link.name === "Bookings" && <span>{countBookings}</span>}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
