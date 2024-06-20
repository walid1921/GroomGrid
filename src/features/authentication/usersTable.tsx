import Menus from "@/components/ui/menus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Spinner from "@/components/ui/spinner";
import Empty from "@/components/ui/Empty";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import PaginationOpr from "@/components/paginationOpr";
import { HiPlus } from "react-icons/hi";
import { CreateForm } from "./createForm";

const UsersTable = () => {
    // const { users, error, isPending, count } = useUsers();

  const navigate = useNavigate();

  //   if (isPending) {
  //     return <Spinner />;
  //   }
  //   if (!users || users.length === 0) {
  //     return <Empty resourceName="users" />;
  //   }

  //   if (error) {
  //     return (
  //       <p className="text-red-500 flex justify-center items-center my-[4.8rem] h-full mx-auto">
  //         {error.message}
  //       </p>
  //     );
  //   }

  return (
    <>
      <div className="flex gap-4 justify-end">
        <CreateForm
          bgPrimary="bg-primary "
          icon={<HiPlus size={20} />}
          title="Create a new user"
          observations="Please fill out the form below to create a new user. Once
              submitted, the user will be added to your account."
        />
      </div>

      {/* <Menus>
        <div className="w-full">
          {!isPending && clients && clients.length > 0 && (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-start font-bold text-[15px]">
                    Client
                  </TableHead>
                  <TableHead className="text-start font-bold text-[15px]">
                    Phone number
                  </TableHead>
                  <TableHead className="text-start font-bold text-[15px] hidden sm:table-cell">
                    Observations
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((users) => (
                  <TableRow key={users.id}>
                    <TableCell className="flex flex-col gap-1 text-start cursor-pointer hover:text-primary">
                      <span className="font-bold">{users.fullName}</span>
                      <span>{users.email}</span>
                    </TableCell>
                    <TableCell className="text-start">
                      {users.phoneNumber}
                    </TableCell>
                    <TableCell className="text-start hidden sm:table-cell">
                      {users.observations}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
        <PaginationOpr count={count ?? 0} />
      </Menus> */}
    </>
  );
};

export default UsersTable;
