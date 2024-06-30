import { useSearchParams } from "react-router-dom";
import { Input } from "./ui/input";
import { useState } from "react";

const SearchOperation = () => {
  const [searchParams] = useSearchParams();

  const [query, setQuery] = useState(searchParams.get("search") || "");

  // const handleChange = (value: string) => {
  //   searchParams.set(value); // filterName is the key and value can be (all, option 1, option 2...) this will Update the URL search parameter with the new filter value
  //   if (searchParams.get("page")) searchParams.set("page", "1");
  //   setSearchParams(searchParams);
  // };

  return (
    <Input
      placeholder="Search clients"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      className="max-w-sm"
    />
  );
};

export default SearchOperation;
