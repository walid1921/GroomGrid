import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DropdownMenuLabel } from "@radix-ui/react-dropdown-menu";
import { CircleUser } from "lucide-react";
import { useLogout } from "./useLogout";
import {
  HiArrowRightOnRectangle,
  HiOutlineCog6Tooth,
  HiOutlineUser,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "@/components/ui/spinnerMini";
import { useUser } from "./useUser";

const Logout = () => {
  const { logout, isPending } = useLogout();
  const { user } = useUser();
  const { fullName, avatar } = user?.user_metadata;

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          {avatar ? (
            <img
              src={avatar}
              alt={`Avatar of ${fullName}`}
              className="h-full w-full rounded-full object-cover"
            />
          ) : (
            <CircleUser className="h-5 w-5" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex justify-center items-center py-1">
          {fullName}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-start items-center"
          onClick={() => {
            navigate("/settings");
          }}
        >
          <span className="flex gap-2">
            <HiOutlineCog6Tooth size={20} /> Settings
          </span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => {
            navigate("/account");
          }}
          className="flex justify-start items-center"
        >
          <span className="flex gap-2">
            <HiOutlineUser size={20} /> Account
          </span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-start items-center"
          disabled={isPending}
          onClick={() => logout()}
        >
          {!isPending ? (
            <span className="flex gap-2">
              <HiArrowRightOnRectangle size={20} /> Logout
            </span>
          ) : (
            <SpinnerMini />
          )}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default Logout;
