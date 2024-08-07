import FilterOperations from "@/components/filterOperations";

function DashboardFilter() {
  return (
    <FilterOperations
      filterName="last"
      options={[
        { value: "0", label: "Today" },
        { value: "7", label: "Last 7 days" },
        { value: "30", label: "Last 30 days" },
        { value: "90", label: "Last 90 days" },
      ]}
    />
  );
}

export default DashboardFilter;
