import { Row } from "@/components/row";
import SortBy from "@/components/sortBy";
import ClientTable from "@/features/clients/clientTable";
import { CreateForm } from "@/features/clients/createForm";
import useClients from "@/features/clients/useClients";
import { HiPlus } from "react-icons/hi";

const clients = () => {
  const { count: countClients } = useClients();

  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem]">
        <h1>
          Clients{" "}
          <span className="font-normal text-[16px] sm:hidden  ml-3">
            ({countClients})
          </span>
        </h1>
      </Row>
      <Row variant="vertical">
        <ClientTable />
      </Row>
    </>
  );
};

export default clients;
