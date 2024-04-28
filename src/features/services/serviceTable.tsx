import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { deleteService, getServices } from "@/services/apiServices";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Spinner from "@/components/ui/spinner";
import { formatCurrency } from "../../utils/helpers";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import { CreateEditService } from "./createEditService";

const ServiceTable = () => {
  //! Fetching services
  const queryClient = useQueryClient();
  const {
    isPending,
    data: services,
    error,
  } = useQuery({
    queryKey: ["service"],
    queryFn: getServices,
  });

  //! Deletion of service
  const { isPending: isDeleting, mutate } = useMutation({
    mutationFn: deleteService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service"] });
      toast.success("Service deleted successfully");
    },
    onError: (error) => {
      toast.error("An error occurred while deleting service");
      console.error(error);
    },
  });

  return (
    <div className="w-full">
      {!isPending ? (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead>Service</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Discount</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>

          {services?.map((service) => (
            <TableBody key={service.id}>
              <TableRow>
                <TableCell>
                  <img src={service.image} alt="Image" />
                </TableCell>
                <TableCell>{service.name}</TableCell>
                <TableCell>{formatCurrency(service.regularPrice)}</TableCell>
                <TableCell
                  className={`${
                    service.discount > 0 ? "text-primary font-bold" : ""
                  }`}
                >
                  {formatCurrency(service.discount)}
                </TableCell>
                <TableCell className="px-0">{service.description}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    {" "}
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => mutate(service.id)}
                      disabled={isDeleting}
                    >
                      delete
                    </Button>
                    <CreateEditService
                      serviceToEdit={service}
                      name="Edit"
                      title="Edit service details"
                      description="Edit the service details below to update the service."
                    />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      ) : (
        <Spinner />
      )}
      {error && (
        <p className="text-red-500 flex justify-center items-center my-[4.8rem] h-full mx-auto">
          {error.message}
        </p>
      )}
    </div>
  );
};

export default ServiceTable;
