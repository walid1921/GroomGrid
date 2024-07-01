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
import DivAnimation from "@/components/divAnimation";

const formSchema = z.object({
  productPrice: z.string().min(0, { message: "Price must be greater than 0" }),
});

function UpdateSettingsForm() {
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
    <DivAnimation className="">
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
    </DivAnimation>
  );
}

export default UpdateSettingsForm;
