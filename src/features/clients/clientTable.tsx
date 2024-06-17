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

const ClientTable = () => {
  const { clients, error, isPending } = useClients();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;
  if (!clients?.length) return <Empty resourceName="services" />;
  if (error)
    return (
      <p className="text-red-500 flex justify-center items-center my-[4.8rem] h-full mx-auto">
        {error.message}
      </p>
    );

  return (
    <Menus>
      <div className="w-full">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-start font-bold text-[15px]">
                Client
              </TableHead>

              <TableHead className="text-start font-bold text-[15px]">
                Phone number
              </TableHead>
              <TableHead className="text-start font-bold text-[15px]  hidden sm:table-cell">
                Observations
              </TableHead>
            </TableRow>
          </TableHeader>

          {clients?.map((client) => (
            <TableBody key={client.id}>
              <TableRow>
                <TableCell
                  onClick={() => navigate(`/clients/${client.id}`)}
                  className="flex flex-col gap-1 text-start cursor-pointer hover:text-primary"
                >
                  <span className="font-bold">{client.fullName}</span>
                  <span> {client.email}</span>
                </TableCell>
                <TableCell className="text-start">
                  {client.phoneNumber}
                </TableCell>
                <TableCell className="text-start hidden sm:table-cell">
                  {client.observations}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </Menus>
  );
};

export default ClientTable;
