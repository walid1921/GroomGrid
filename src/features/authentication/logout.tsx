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
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import SpinnerMini from "@/components/ui/spinnerMini";

const Logout = () => {
  const { logout, isPending } = useLogout();

  const navigate = useNavigate();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" size="icon" className="rounded-full">
          <CircleUser className="h-5 w-5" />
          <span className="sr-only">Toggle user menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel className="flex justify-center items-center">
          My Account
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-center items-center"
          onClick={() => {
            navigate("/settings");
          }}
        >
          Settings
        </DropdownMenuItem>
        <DropdownMenuItem className="flex justify-center items-center">
          Support
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex justify-center items-center"
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
