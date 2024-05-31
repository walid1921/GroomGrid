import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineScissors,
  HiOutlineUsers,
} from "react-icons/hi2";
import useServices from "@/features/services/useServices";
import useBookings from "@/features/bookings/useBookings";

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
  const { services } = useServices();
  const { bookings } = useBookings();

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

                {link.name === "Services" && <span>{services?.length}</span>}

                {link.name === "Bookings" && <span>{bookings?.length}</span>}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
