import { Row } from "@/components/row";
import TitleAnimation from "@/components/titleAnimation";
import ClientTable from "@/features/clients/clientTable";
import useClients from "@/features/clients/useClients";

const clients = () => {
  const { count: countClients } = useClients("");

  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem]">
        <TitleAnimation>
          Clients{" "}
          <span className="font-normal text-[16px] sm:hidden  ml-3">
            ({countClients})
          </span>
        </TitleAnimation>
      </Row>
      <Row variant="vertical">
        <ClientTable />
      </Row>
    </>
  );
};

export default clients;
