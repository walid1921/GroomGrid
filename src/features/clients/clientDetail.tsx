import { Button } from "@/components/ui/button";
import { useMoveBack } from "../../hooks/useMoveBack";
import { Row } from "@/components/row";
import Spinner from "@/components/ui/spinner";
import { useNavigate } from "react-router-dom";

import useClient from "./useclient";
import useDeleteClient from "./useDeleteClient";
import ClientCardInfo from "./clientCardInfo";
import ConfirmDelete from "@/components/confirmDelete";

function ClientDetail() {
  const { client, isPending } = useClient();

  const { isDeleting, deleteClient } = useDeleteClient();

  const moveBack = useMoveBack();
  const navigate = useNavigate();

  if (isPending) return <Spinner />;

  return (
    <>
      <Row className="flex-col sm:flex-row justify-between items-start gap-6 sm:gap-0">
        <div className="flex flex-col gap-3 items-start ">
          <div className="flex items-center gap-3">
            <h1 className="flex flex-col  text-3xl sm:text-4xl">
              {client?.fullName}
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <ConfirmDelete
            id={"client"}
            disabled={isDeleting}
            onConfirm={() => {
              deleteClient(client.id);
              navigate(`/clients`);
            }}
            resourceName={client.fullName}
          />
          <Button variant={"outline"} onClick={moveBack}>
            &larr; Back
          </Button>
        </div>
      </Row>

      <ClientCardInfo client={client} />
    </>
  );
}

export default ClientDetail;
