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

const ClientTable = () => {
  //! Search query
  const [query, setQuery] = useState("");

  const { clients, error, isPending, count } = useClients(query);
  const navigate = useNavigate();

  return (
    <>
      <div className="flex gap-4 justify-end">
        <CreateForm
          bgPrimary="bg-primary "
          icon={<HiPlus size={20} />}
          title="Create a new client"
          observations="Please fill out the form below to create a new client. Once
              submitted, the client will be added to your account."
        />
        <Input
          placeholder="Search clients"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="max-w-sm "
        />
      </div>

      <Menus>
        <div className="w-full">
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
                      className="flex flex-col gap-1 text-start cursor-pointer hover:text-primary"
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
        </div>
        <PaginationOpr count={count ?? 0} />
      </Menus>
    </>
  );
};

export default ClientTable;
