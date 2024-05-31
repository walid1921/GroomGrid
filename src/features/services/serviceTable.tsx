import { HiDotsVertical, HiPencil, HiTrash } from "react-icons/hi";
import { HiSquare2Stack } from "react-icons/hi2";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Spinner from "@/components/ui/spinner";
import Menus from "@/components/ui/menus";
import { formatCurrency } from "../../utils/helpers";
import { CreateEditForm } from "./createEditForm";

import useDeleteService from "./useDeleteService";
import useServices from "./useServices";
import useCreateService from "./useCreateService";
import { useSearchParams } from "react-router-dom";
import Empty from "@/components/ui/Empty";

const ServiceTable = () => {
  //! Fetching services + Filtering
  const { isPending, services, error } = useServices();

  // Filtering services
  const [searchParams] = useSearchParams();
  const filterValue = searchParams.get("discount") || "all";

  let filteredServices;
  if (filterValue === "all") filteredServices = services;
  if (filterValue === "no-discount")
    filteredServices = services?.filter((service) => service.discount === 0);
  if (filterValue === "with-discount")
    filteredServices = services?.filter((service) => service.discount > 0);

  // Sorting services
  const sortBy = searchParams.get("sortBy") || "startDate-asc";
  const [field, direction] = sortBy.split("-");
  const modifier = direction === "asc" ? 1 : -1;

  const sortedServices = filteredServices?.sort((a, b) => {
    if (typeof a[field] === "string" && typeof b[field] === "string") {
      return a[field].localeCompare(b[field]) * modifier;
    } else {
      return (a[field] - b[field]) * modifier;
    }
  });

  //! Deletion of service
  const { isDeleting, deleteService } = useDeleteService();

  //! Duplicate service
  const { isCreating, createService } = useCreateService();

  if (isPending) return <Spinner />;
  if (!services?.length) return <Empty resourceName="services" />;
  if (error)
    return (
      <p className="text-red-500 flex justify-center items-center my-[4.8rem] h-full mx-auto">
        {error.message}
      </p>
    );

  return (
    <Menus>
      <div className="w-full">
        <Table>
          <TableCaption>A list of your recent services.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold text-[15px]">
                Image
              </TableHead>
              <TableHead className="font-bold text-[15px]">Service</TableHead>
              <TableHead className="font-bold text-[15px]">Price</TableHead>
              <TableHead className="font-bold text-[15px]">Discount</TableHead>
              <TableHead className="font-bold text-[15px]">
                Description
              </TableHead>
            </TableRow>
          </TableHeader>

          {sortedServices?.map((service) => (
            <TableBody key={service.id}>
              <TableRow>
                <TableCell>
                  <img
                    src={service.image}
                    alt="Image"
                    className="bg-servicePic rounded-lg"
                  />
                </TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{formatCurrency(service.regularPrice)}</TableCell>
                <TableCell
                  className={`${
                    service.discount > 0 ? "text-primary font-bold" : ""
                  }`}
                >
                  {service.discount ? formatCurrency(service.discount) : "-"}
                </TableCell>
                <TableCell className="px-0">{service.description}</TableCell>
                <TableCell>
                  {/* ----------------------------- Menu ----------------------------- */}
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <HiDotsVertical size={25} />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem
                        className="flex justify-start gap-2 w-full cursor-pointer"
                        disabled={isCreating}
                        onClick={() =>
                          createService({
                            name: service.name,
                            regularPrice: service.regularPrice,
                            discount: service.discount,
                            description: service.description,
                            image: service.image,
                          })
                        }
                      >
                        <HiSquare2Stack size={20} /> Duplicate
                      </DropdownMenuItem>

                      <CreateEditForm
                        bgPrimary="w-full"
                        serviceToEdit={service}
                        icon={<HiPencil size={20} />}
                        text="Edit"
                        title="Edit service details"
                        description="Edit the service details below to update the service."
                      />

                      <DropdownMenuSeparator />
                      <DropdownMenuItem
                        onClick={() => deleteService(service.id)}
                        disabled={isDeleting}
                        className="flex justify-start gap-2 w-full  text-destructive  cursor-pointer"
                      >
                        <HiTrash size={20} /> Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {/* ----------------------------- Menu ----------------------------- */}
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      </div>
    </Menus>
  );
};

export default ServiceTable;
