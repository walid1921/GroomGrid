import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Controller, useForm } from "react-hook-form";

import useServices from "../services/useServices";
import { createBookingSchema } from "@/validators/createBookingValidation";
import React from "react";

type InputType = z.infer<typeof createBookingSchema>;

type serviceToEditProps = {
  id: number;
  name: string;
  regularPrice?: string;
  discount?: string;
  image: string;
  description: string;
};

export function CreateEditForm({
  icon,
  bg,
  width,
  border,
  height,
  text,
  title,
  description,
  serviceToEdit = {
    id: 0,
    name: "",
    regularPrice: "",
    discount: "",
    image: "",
    description: "",
  },
}: {
  icon: React.ReactNode;
  bg?: string;
  width?: string;
  border?: string;
  height?: string;
  text?: string;
  title: string;
  description: string;
  serviceToEdit?: serviceToEditProps;
}) {
  const { id: editId, ...editValues } = serviceToEdit;
  const isEditSession = Boolean(editId);

  const form = useForm<InputType>({
    resolver: zodResolver(createBookingSchema),
    defaultValues: isEditSession
      ? editValues
      : {
          name: "Haircut",
          date: new Date(),
          regularPrice: "30",
          discount: "0",
          description: "",
          image: "",
        },
  });

  const [date, setDate] = React.useState<Date>();

  //! select a service
  const { isPending, services, error } = useServices();

  console.log(services);

  //! Create booking
  // const { isCreating, createService } = useCreateService();

  //! Edit booking
  // const { isUpdating, updateService } = useUpdateService();

  // const isWorking = isCreating || isUpdating;

  //! Submit form
  const onSubmit = (data: InputType) => {
    // if (parseFloat(data.discount) >= parseFloat(data.regularPrice)) {
    //   toast.error("Discount must be less than the regular price");
    //   return;
    // }

    // if (isEditSession) {
    //   updateService({
    //     updatedService: { ...data, image: data.name },
    //     id: editId,
    //   });
    // } else {
    //   createService({ ...data, image: data.name });
    // }
    console.log("fake submit", data);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            className={`flex justify-start text-left gap-2 ${height} ${border} ${bg} ${width}`}
          >
            {icon} {text}
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>

          {/* <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 sm:gap-8 mt-10"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service name</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {services.map((service) => (
                          <SelectItem
                            key={service.id}
                            value={service.name.toString()}
                          >
                            {service.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Pick a date</FormLabel>
                    <FormControl>
                     
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <SheetClose className="sm:mt-10 mt-4">
                <Button
                  type="submit"
                  // disabled={isWorking}
                  className="hover:text-primary-foreground  border border-[#3ecf8e4d] hover:bg-[#3ecf8e80]"
                >
                  {isEditSession ? "Save Changes" : "Create New Service"}
                </Button>
              </SheetClose>
            </form>
          </Form> */}

          <Select >
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder="Select a service" />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {["Haircut", "Hair & Beard", "Long hair", "Beard"].map((service) => (
                <SelectItem key={service} value={service.toString()}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-[280px] justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </SheetContent>
      </Sheet>
    </>
  );
}
