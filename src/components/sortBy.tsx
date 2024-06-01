import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams } from "react-router-dom";

type SortByTypes = {
  options: { label: string; value: string }[];
};

const SortBy = ({ options, ...props }: SortByTypes) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const currentSort = searchParams.get("sortBy") || "";

  const handleChange = (value: string) => {
    searchParams.set("sortBy", value);
    setSearchParams(searchParams);
  };

  return (
    <Select value={currentSort} onValueChange={handleChange}>
      <SelectTrigger className="w-[200px] bg-transparent">
        <SelectValue placeholder="Sort" className="text-white" />
      </SelectTrigger>
      <SelectContent {...props}>
        {options.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
            className={`cursor-pointer ${
              currentSort === option.value
                ? "opacity-50 cursor-not-allowed pointer-events-none"
                : ""
            }`}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default SortBy;
