import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HiPencil } from "react-icons/hi2";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import useUpdateSetting from "./useUpdateSetting";
import UseSettings from "./useSettings";
import Spinner from "@/components/ui/spinner";
import { Input } from "@/components/ui/input";
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

const formSchema = z.object({
  productPrice: z.string().min(0, { message: "Price must be greater than 0" }),
});

const UpdatePriceForm = () => {
  //! fetching settings
  const { isLoading, settings: { productPrice } = {} } = UseSettings();

  //! updating settings
  const { isUpdating, updateSetting } = useUpdateSetting();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productPrice: productPrice,
    },
  });

  function handleUpdate(
    e: React.FocusEvent<HTMLInputElement>,
    newSetting: string
  ) {
    const value = e.target.value;
    updateSetting({ [newSetting]: value });
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="flex gap-2">
          <HiPencil size={16} /> Product Price
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit the Product Price</SheetTitle>
        </SheetHeader>
        {isLoading ? (
          <Spinner />
        ) : (
          <Form {...form}>
            <form className="flex flex-col gap-8 mt-10">
              <FormField
                control={form.control}
                name="productPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Price</FormLabel>
                    <FormControl>
                      <Input
                        type={"number"}
                        {...field}
                        disabled={isUpdating}
                        defaultValue={productPrice}
                        onBlur={(e) => handleUpdate(e, "productPrice")}
                      />
                    </FormControl>

                    <FormDescription className="text-[12px]">
                      Here you can change the product price.
                    </FormDescription>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default UpdatePriceForm;
