import Menus from "@/components/ui/menus";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useClients from "./useClients";
import Spinner from "@/components/ui/spinner";
import Empty from "@/components/ui/Empty";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import PaginationOpr from "@/components/paginationOpr";
import { CreateForm } from "./createForm";
import { HiPlus } from "react-icons/hi";
import DivAnimation from "@/components/divAnimation";

const ClientTable = () => {
  //! Search query
  const [query, setQuery] = useState("");

  const { clients, error, isPending, count } = useClients(query);
  const navigate = useNavigate();

  return (
    <>
      <DivAnimation className="flex gap-4 justify-end">
        <CreateForm
          icon={<HiPlus size={20} />}
          title="Create a new client"
          observations="Please fill out the form below to create a new client. Once
              submitted, the client will be added to your account."
        />
        <Input
          placeholder="Search clients"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm bg-transparent border-gray-500 h-8 px-2 py-2 sm:h-10 sm:px-4 sm:py-2"
        />
      </DivAnimation>

      <Menus>
        <DivAnimation className="w-full">
          {isPending && <Spinner />}
          {error && (
            <p className="text-red-500 flex justify-center items-center my-[4.8rem] h-full mx-auto">
              {error.message}
            </p>
          )}
          {!isPending &&
            (!clients || clients.length === 0) && ( //  ensures we handle both undefined and empty array cases for clients
              <Empty resourceName="clients" />
            )}
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
                {clients.map((client) => (
                  <TableRow key={client.id}>
                    <TableCell
                      onClick={() => navigate(`/clients/${client.id}`)}
                      className="flex flex-col gap-1 text-start cursor-pointer hover:text-[#3ecf8e80]"
                    >
                      <span className="font-bold">{client.fullName}</span>
                      <span>{client.email}</span>
                    </TableCell>
                    <TableCell className="text-start">
                      {client.phoneNumber}
                    </TableCell>
                    <TableCell className="text-start hidden sm:table-cell">
                      {client.observations}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </DivAnimation>
        <DivAnimation className="">
          <PaginationOpr count={count ?? 0} />
        </DivAnimation>
      </Menus>
    </>
  );
};

export default ClientTable;
