import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineScissors,
  HiOutlineUserGroup,
} from "react-icons/hi2";
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
    name: "Clients",
    icon: HiOutlineUserGroup,
    to: "/clients",
  },
  {
    name: "Settings",
    icon: HiOutlineCog6Tooth,
    to: "/settings",
  },
];

const SmallNav = () => {
  return (
    <ul className="flex justify-center items-center gap-6">
      {navLinks.map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            className="flex hover:bg-bgMain hover:rounded-md py-2 px-2"
          >
            <link.icon size={25} />
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default SmallNav;
