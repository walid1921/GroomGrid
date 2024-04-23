import {
  Sheet,
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
  formControl?: Control<InputType, unknown>;
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

export function CreateServiceForm() {
  const form = useForm<InputType>({
    resolver: zodResolver(createServiceSchema),
    defaultValues: {
      name: "Haircut",
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
        name: "Haircut",
        regularPrice: "30",
        discount: "0",
        description: "",
      });
    },
    onError: (error) => {
      toast.error("An error occurred while adding service");
      console.error(error);
    },
  });

  const onSubmit = (values: InputType) => {
    if (parseFloat(values.discount) >= parseFloat(values.regularPrice)) {
      toast.error("Discount must be less than the regular price");
      return;
    }
    mutate({ ...values, image: values.name });
    console.log(values);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button size="sm">New service</Button>
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
                          (price) => (
                            <SelectItem key={price} value={price.toString()}>
                              {price}
                            </SelectItem>
                          )
                        )}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="regularPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Regular Price</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a price" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[20, 25, 30, 35, 50].map((price) => (
                          <SelectItem key={price} value={price.toString()}>
                            {price}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
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

              <Button type="submit" disabled={isCreating}>
                Submit
              </Button>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
