import { NavLink } from "react-router-dom";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineScissors,
  HiOutlineUsers,
} from "react-icons/hi2";
import useServices from "@/features/services/useServices";

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

  return (
    <nav>
      <ul className="flex flex-col gap-7">
        {navLinks.map((link) => (
          <li key={link.to}>
            <NavLink
              to={link.to}
              className="flex items-center gap-3 hover:bg-bgMain py-2 px-4 "
            >
              <link.icon size={25} />
              <div className="text-[14px] flex justify-between items-center w-full">
                {link.name}

                {link.name === "Services" && (
                  <span className="border px-2 rounded-full">
                    {services?.length}
                  </span>
                )}
              </div>
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
