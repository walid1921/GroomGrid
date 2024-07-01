import { Row } from "@/components/row";
import { CreateEditForm } from "@/features/services/createEditForm";
import ServiceTable from "@/features/services/serviceTable";
import FilterOperations from "@/components/filterOperations";
import { HiPlus } from "react-icons/hi";
import SortBy from "@/components/sortBy";
import useServices from "@/features/services/useServices";
import TitleAnimation from "@/components/titleAnimation";
import DivAnimation from "@/components/divAnimation";

// import { getServices } from "@/services/apiServices";

// Hair and beard
// King package: The all inclusive program. Wash, cut, blow-dry plus beard and contours.
// Kid haircut
// Father and son
// Long hair
// beard : We shave with shaving foam, towel, after shave and beard care.

function Services() {
  const { count: countServices } = useServices();

  return (
    <>
      <Row className="flex-col sm:flex-row items-start gap-[1.6rem]">
        <TitleAnimation>
          Services{" "}
          <span className="font-normal text-[16px] sm:hidden ml-3">
            ({countServices})
          </span>
        </TitleAnimation>
        <DivAnimation className="flex items-center gap-4 ">
          <CreateEditForm
            text="New service"
            icon={<HiPlus size={20} />}
            title="Create a new service"
            description="Please fill out the form below to create a new service. Once
              submitted, the service will be added to your account."
          />
          <FilterOperations
            filterName="discount"
            options={[
              { value: "all", label: "All" },
              { value: "no-discount", label: "No discount" },
              { value: "with-discount", label: "With discount" },
            ]}
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
        </DivAnimation>
      </Row>
      <Row variant="vertical">
        <ServiceTable />
      </Row>
    </>
  );
}

export default Services;
