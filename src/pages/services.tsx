import { Row } from "@/components/row";
import { CreateEditForm } from "@/features/services/createEditForm";
import ServiceTable from "@/features/services/serviceTable";
import FilterOperations from "@/components/filterOperations";
import { HiPlus } from "react-icons/hi";
import SortBy from "@/components/sortBy";

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
        <div className="flex items-center gap-4 ">
          <CreateEditForm
            bgPrimary="bg-primary "
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
              { value: "name-asc", label: "Sort by name (A-Z)" },
              { value: "name-desc", label: "Sort by name (Z-A)" },
              { value: "regularPrice-asc", label: "Sort by price (low first)" },
              {
                value: "regularPrice-desc",
                label: "Sort by price (high first)",
              },
            ]}
          />
        </div>
      </Row>
      <Row variant="vertical">
        <ServiceTable />
      </Row>
    </>
  );
}

export default Services;
