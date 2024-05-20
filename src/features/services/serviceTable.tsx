import { HiPencil, HiTrash } from "react-icons/hi";
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
import Menus from "@/components/ui/menus";
import { formatCurrency } from "../../utils/helpers";
import { CreateEditForm } from "./createEditForm";

import { Button } from "@/components/ui/button";
import useDeleteService from "./useDeleteService";
import useServices from "./useServices";
import useCreateService from "./useCreateService";

const ServiceTable = () => {
  //! Fetching services
  const { isPending, services, error } = useServices();

  //! Deletion of service
  const { isDeleting, deleteService } = useDeleteService();

  //! Duplicate service
  const { isCreating, createService } = useCreateService();

  return (
    <Menus>
      <div className="w-full">
        {!isPending ? (
          <Table>
            <TableCaption>A list of your recent services.</TableCaption>
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
                    <Menus.Menu>
                      <Menus.Toggle id={service.id} />
                      <Menus.List id={service.id}>
                        <Menus.Button>
                          <Button
                            className="flex justify-start gap-2 w-full"
                            variant="ghost"
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
                          </Button>
                        </Menus.Button>
                        <Menus.Button>
                          <CreateEditForm
                            serviceToEdit={service}
                            icon={<HiPencil size={20} />}
                            text="Edit"
                            title="Edit service details"
                            description="Edit the service details below to update the service."
                          />
                        </Menus.Button>
                        <Menus.Button>
                          {" "}
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="flex justify-start gap-2 w-full hover:bg-red-500 hover:text-white"
                              >
                                <HiTrash size={20} /> Delete
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
                                  <Button
                                    type="button"
                                    size="sm"
                                    variant="secondary"
                                  >
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
                        </Menus.Button>
                      </Menus.List>{" "}
                    </Menus.Menu>
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
    </Menus>
  );
};

export default ServiceTable;
