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
        <div className="flex items-center gap-4 ">
          <CreateForm
            bgPrimary="bg-primary "
            icon={<HiPlus size={20} />}
            title="Create a new client"
            observations="Please fill out the form below to create a new client. Once
              submitted, the client will be added to your account."
          />
          <SortBy
            options={[
              { value: "name-asc", label: "Name (A-Z)" },
              { value: "name-desc", label: "Name (Z-A)" },
              { value: "regularPrice-asc", label: "Low price" },
              {
                value: "regularPrice-desc",
                label: "High price",
              },
            ]}
          />
        </div>
      </Row>
      <Row variant="vertical">
        <ClientTable />
      </Row>
    </>
  );
};

export default clients;
