import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PAGE_SIZE } from "@/utils/constants";
import { useSearchParams } from "react-router-dom";

const PaginationOpr = ({ count }: { count: number }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / PAGE_SIZE);

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;

    searchParams.set("page", next.toString());
    setSearchParams(searchParams);
  }

  function previousPage() {
    const previous = currentPage === 1 ? currentPage : currentPage - 1;

    searchParams.set("page", previous.toString());
    setSearchParams(searchParams);
  }

  if (pageCount <= 1) return null;

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem onClick={previousPage} className="cursor-pointer">
          <PaginationPrevious />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink size={"icon"}>{currentPage}</PaginationLink>
        </PaginationItem>
        -
        <PaginationItem>
          <PaginationLink size={"icon"}> {pageCount}</PaginationLink>
        </PaginationItem>
        <PaginationItem onClick={nextPage} className="cursor-pointer">
          <PaginationNext />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationOpr;
