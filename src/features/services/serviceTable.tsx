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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import Spinner from "@/components/ui/spinner";
import { formatCurrency } from "../../utils/helpers";
import { CreateEditService } from "./createEditService";

import { Button } from "@/components/ui/button";
import useDeleteService from "./useDeleteService";
import useServices from "./useServices";
import { HiPencil, HiTrash } from "react-icons/hi";

const ServiceTable = () => {
  //! Fetching services
  const { isPending, services, error } = useServices();

  //! Deletion of service
  const { isDeleting, deleteService } = useDeleteService();

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
                  {service.discount ? formatCurrency(service.discount) : "-"}
                </TableCell>
                <TableCell className="px-0">{service.description}</TableCell>
                <TableCell>
                  <div className="flex gap-4">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="destructive" size="sm">
                          <HiTrash size={20} />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Delete service</DialogTitle>
                          <DialogDescription className="flex justify-center pt-4">
                            Are you sure you want to delete this service?
                          </DialogDescription>
                        </DialogHeader>

                        <DialogFooter className="sm:justify-center mt-6">
                          <DialogClose asChild>
                            <Button type="button" size="sm" variant="secondary">
                              Close
                            </Button>
                          </DialogClose>
                          <Button
                            variant="destructive"
                            size="sm"
                            onClick={() => deleteService(service.id)}
                            disabled={isDeleting}
                          >
                            Delete
                          </Button>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                    <CreateEditService
                      serviceToEdit={service}
                      text={<HiPencil size={20} />}
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
