import { Row } from "@/components/row";
import ServiceTable from "@/features/services/serviceTable";

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
      <Row>
        <ServiceTable />
      </Row>
    </>
  );
}

export default Services;
