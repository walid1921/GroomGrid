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
  FormDescription,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
import { Control, FieldPath, useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createServiceSchema } from "@/validators/createServiceValidation";
import useUpdateService from "./useUpdateService";
import useCreateService from "./useCreateService";

type InputType = z.infer<typeof createServiceSchema>;

type CreateServiceFieldProps = {
  name: FieldPath<InputType>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl?: Control<InputType, unknown>;
};

//! CreateServiceField component
const CreateServiceField = ({
  formControl,
  name,
  label,
  placeholder,
  description,
  inputType,
}: CreateServiceFieldProps) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={inputType || "text"}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && (
            <FormDescription className="text-[12px]">
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export function CreateEditForm({
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
  text: React.ReactNode;
  title: string;
  description: string;
  serviceToEdit?: {
    id: number;
    name: string;
    regularPrice?: string;
    discount?: string;
    image: string;
    description: string;
  };
}) {
  const { id: editId, ...editValues } = serviceToEdit;
  const isEditSession = Boolean(editId);

  const form = useForm<InputType>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: isEditSession
      ? editValues
      : {
          name: "Haircut",
          regularPrice: "30",
          discount: "0",
          description: "",
          image: "",
        },
  });

  //! Create service
  const { isCreating, createService } = useCreateService();

  //! Edit service
  const { isUpdating, updateService } = useUpdateService();

  const isWorking = isCreating || isUpdating;

  //! Submit form
  const onSubmit = (data: InputType) => {
    if (parseFloat(data.discount) >= parseFloat(data.regularPrice)) {
      toast.error("Discount must be less than the regular price");
      return;
    }

    if (isEditSession) {
      updateService({
        updatedService: { ...data, image: data.name },
        id: editId,
      });
    } else {
      createService({ ...data, image: data.name });
    }
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm">{text}</Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8 mt-10"
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
                        {["Haircut", "Hair & Beard", "Long hair", "Beard"].map(
                          (service) => (
                            <SelectItem
                              key={service}
                              value={service.toString()}
                            >
                              {service}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <CreateServiceField
                name="regularPrice"
                label="Regular Price"
                placeholder="Regular Price"
                description="Price must be a number"
                formControl={form.control}
              />

              <CreateServiceField
                name="discount"
                label="Discount"
                placeholder="Discount"
                description="Discount must be less than the regular price"
                formControl={form.control}
              />

              <CreateServiceField
                name="description"
                label="Description"
                placeholder="Description"
                formControl={form.control}
              />

              <SheetClose className="mt-10">
                <Button type="submit" disabled={isWorking}>
                  {isEditSession ? "Edit Service" : "Create New Service"}
                </Button>
              </SheetClose>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
