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

  if (isPending) return <Spinner />;

  return (
    <div className="w-full">
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Img</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Capacity</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Discount</TableHead>
          </TableRow>
        </TableHeader>

        {services?.map((service) => (
          <TableBody key={service.id}>
            <TableRow>
              <TableCell>
                <img src={service.image} alt={service.name} />
              </TableCell>
              <TableCell>{service.name}</TableCell>
              <TableCell>{service.maxCapacity}</TableCell>
              <TableCell>{formatCurrency(service.regularPrice)}</TableCell>
              <TableCell className="text-primary">
                {formatCurrency(service.discount)}
              </TableCell>
              <TableCell>{service.amount}</TableCell>
              <TableCell>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => mutate(service.id)}
                  disabled={isDeleting}
                >
                  delete
                </Button>
              </TableCell>
            </TableRow>
          </TableBody>
        ))}
      </Table>
    </div>
  );
};

export default ServiceTable;
