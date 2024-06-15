import { Button } from "@/components/ui/button";
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
import { HiTrash } from "react-icons/hi";

type ConfirmDeleteProps = {
  id: string;
  resourceName: number | string;
  onConfirm: () => void;
  disabled: boolean;
};

function ConfirmDelete({
  id,
  resourceName,
  onConfirm,
  disabled,
}: ConfirmDeleteProps) {
  return (
    <Dialog>
      <DialogTrigger className=" relative select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 flex justify-start gap-2 w-full  text-destructive  cursor-pointer hover:bg-destructive hover:text-white">
        <HiTrash size={20} /> Delete
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="py-5">
            {id === "booking" &&
              `Are you sure you want to delete booking #${resourceName}?`}
            {id === "service" &&
              `Are you sure you want to delete service (${resourceName})?`}
          </DialogTitle>
          <DialogDescription className="py-4">
            {id === "booking" &&
              `This action cannot be undone. This will permanently delete (booking #${resourceName}) and remove it from our servers.`}
            {id === "service" &&
              `This action cannot be undone. This will permanently delete (service ${resourceName}) and remove it from our servers.`}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button
              variant={"destructive"}
              disabled={disabled}
              onClick={onConfirm}
            >
              Delete
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default ConfirmDelete;
