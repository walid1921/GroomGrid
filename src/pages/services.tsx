import { Row } from "@/components/row";
import ServiceTable from "@/features/services/serviceTable";
import { getServices } from "@/services/apiServices";
import { useQuery } from "@tanstack/react-query";
import BeatLoader from "react-spinners/BeatLoader";

// import { getServices } from "@/services/apiServices";

// Hair and beard
// King package: The all inclusive program. Wash, cut, blow-dry plus beard and contours.
// Kid haircut
// Father and son
// Long hair
// beard : We shave with shaving foam, towel, after shave and beard care.

function Services() {
  const {
    isPending,
    data: services,
    error,
  } = useQuery({
    queryKey: ["service"],
    queryFn: getServices,
  });

  console.log(services);
  console.log(error);

  if (isPending) return <BeatLoader color="#36d7b7" />;

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
