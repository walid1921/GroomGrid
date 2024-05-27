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

type FilterOptions = {
  filterName: string;
  options: { label: string; value: string }[];
};

const FilterOperations = ({ filterName, options }: FilterOptions) => {
  const [searchParams, setSearchParams] = useSearchParams();

  // to get the current filter value from the URL and make it checked
  const currentFilter = searchParams.get(filterName) || options[0].value;

  const handleClick = (value: string) => {
    searchParams.set(filterName, value);
    setSearchParams(searchParams);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className=" gap-2 px-4 ">
          <ListFilter className="h-4 w-4" />
          <span className="">
            Filter
          </span>
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
