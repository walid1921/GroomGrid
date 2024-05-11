import { Row } from "@/components/row";
import { CreateEditForm } from "@/features/services/createEditForm";
import ServiceTable from "@/features/services/serviceTable";
import { HiPlus } from "react-icons/hi";

// import { getServices } from "@/services/apiServices";

// Hair and beard
// King package: The all inclusive program. Wash, cut, blow-dry plus beard and contours.
// Kid haircut
// Father and son
// Long hair
// beard : We shave with shaving foam, towel, after shave and beard care.

function Services() {
  return (
    <>
      <Row>
        <h1>Services</h1>
        <p>Filter / sort</p>
      </Row>
      <Row variant="vertical">
        <ServiceTable />
        <div className="flex justify-center">
          <CreateEditForm
            text={<HiPlus size={20} />}
            title="Create a new service"
            description="Please fill out the form below to create a new service. Once
              submitted, the service will be added to your account."
          />
        </div>
      </Row>
    </>
  );
}

export default Services;
