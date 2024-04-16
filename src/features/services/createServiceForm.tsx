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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Control, FieldPath, useForm } from "react-hook-form";
import { createServiceSchema } from "@/validators/createServiceValidation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createService } from "@/services/apiServices";
import toast from "react-hot-toast";

type InputType = z.infer<typeof createServiceSchema>;

interface CreateServiceFieldProps {
  name: FieldPath<InputType>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl?: Control<InputType, any>;
}
const CreateServiceField: React.FC<CreateServiceFieldProps> = ({
  formControl,
  name,
  label,
  placeholder,
  description,
  inputType,
}) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              type={inputType || " text"}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export function CreateServiceForm() {
  const form = useForm<InputType>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: "",
      maxCapacity: "1",
      regularPrice: "30",
      discount: "0",
      description: "",
      image: "",
    },
  });

  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate } = useMutation({
    mutationFn: createService,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["service"] });
      toast.success("New service added successfully");
      form.reset({
        name: "",
        maxCapacity: "1",
        regularPrice: "30",
        discount: "0",
        description: "",
        image: "",
      });
    },
    onError: (error) => {
      toast.error("An error occurred while adding service");
      console.error(error);
    },
  });

  const onSubmit = (values: InputType) => {
    const parsedValues: InputType = {
      ...values,
      maxCapacity: parseFloat(values.maxCapacity),
      regularPrice: parseFloat(values.regularPrice),
      discount: parseFloat(values.discount),
    };
    mutate(parsedValues);
    console.log(parsedValues);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm">Add</Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Create a new service</SheetTitle>
            <SheetDescription>
              This action cannot be undone. This will permanently delete your
              account and remove your data from our servers.
            </SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-8 mt-10"
            >
              <CreateServiceField
                name="name"
                label="name"
                placeholder="Service name"
                formControl={form.control}
              />
              <CreateServiceField
                name="maxCapacity"
                label="Maximum capacity"
                placeholder="Maximum capacity"
                formControl={form.control}
              />

              <CreateServiceField
                name="regularPrice"
                label="Regular Price"
                placeholder="Regular Price"
                formControl={form.control}
              />

              <CreateServiceField
                name="discount"
                label="Discount"
                placeholder="Discount"
                formControl={form.control}
              />

              <CreateServiceField
                name="description"
                label="Description"
                placeholder="Description"
                formControl={form.control}
              />

              <CreateServiceField
                name="image"
                label="Image"
                placeholder="Image"
                formControl={form.control}
              />
              <SheetClose asChild>
                <Button type="submit" disabled={isCreating}>
                  Submit
                </Button>
              </SheetClose>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
