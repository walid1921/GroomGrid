import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useWorkingTime } from "./useWorkingTime";
import Spinner from "@/components/ui/spinner";
import Empty from "@/components/ui/Empty";
import { UpdateTime } from "./updateTime";
import { HiDotsVertical } from "react-icons/hi";

export function WorkingTimeTable() {
  const { workingTime, error, isPending } = useWorkingTime();

  if (isPending) return <Spinner />;
  if (!workingTime?.length) return <Empty resourceName="workingTime" />;
  if (error)
    return (
      <p className="text-red-500 flex justify-center items-center my-[4.8rem] h-full mx-auto">
        {error.message}
      </p>
    );

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-start">Day</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Opening Time</TableHead>
          <TableHead>Closing Time</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {workingTime.map((time) => (
          <TableRow key={time.id}>
            <TableCell className="font-medium text-start">{time.day}</TableCell>
            <TableCell>{time.isOpen === false ? "Blocked" : "Open"}</TableCell>
            <TableCell>{time.start}</TableCell>
            <TableCell>{time.end}</TableCell>
            <TableCell className="">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <HiDotsVertical size={25} />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <UpdateTime workingTimeToEdit={time} />
                </DropdownMenuContent>
              </DropdownMenu>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
