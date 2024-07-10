import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ListFilter } from "lucide-react";
import { useSearchParams } from "react-router-dom";

type FilterOperationsTypes = {
  filterName: string;
  options: { label: string; value: string }[];
};

const FilterOperations = ({ filterName, options }: FilterOperationsTypes) => {
  const [searchParams, setSearchParams] = useSearchParams(); // its a hook to get and set the search params from the URL

  const currentFilter = searchParams.get(filterName) || options[0].value; // to get the current filter value from the URL and make it checked

  const handleClick = (value: string) => {
    searchParams.set(filterName, value); // filterName is the key and value can be (all, option 1, option 2...) this will Update the URL search parameter with the new filter value
    if (searchParams.get("page")) searchParams.set("page", "1");
    setSearchParams(searchParams);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className=" gap-2 h-8 px-2 py-2 sm:h-10 sm:px-4 sm:py-2 ">
          <ListFilter className="h-4 w-4" />
          <span>Filter</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Filter by</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {options.map((option) => (
          <DropdownMenuCheckboxItem
            key={option.value}
            className="cursor-pointer"
            checked={currentFilter === option.value}
            disabled={currentFilter === option.value}
            onClick={() => handleClick(option.value)}
          >
            {option.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterOperations;
