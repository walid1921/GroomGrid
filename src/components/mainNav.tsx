import {
  HiOutlineHome,
  HiOutlineScissors,
  HiOutlineUsers,
} from "react-icons/hi";
import { HiOutlineCalendarDays, HiOutlineCog6Tooth } from "react-icons/hi2";
import { NavLink } from "react-router-dom";

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
  return (
    <nav>
      <ul className="flex flex-col gap-7">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className="flex items-center gap-3 hover:bg-[#f9fafb] py-2 px-4 "
            >
              <link.icon size={20} />
              <span className="text-[14px]">{link.name}</span>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
