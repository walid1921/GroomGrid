import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Form } from "@/components/ui/form";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";

import useCreateClient from "./useCreateClient";
import { createClientSchema } from "@/validators/createClientValidation";
import ClientFormInput from "./clientFormInput";

type InputType = z.infer<typeof createClientSchema>;

export function CreateForm({
  icon,
  text,
  title,
  observations,
}: {
  icon: React.ReactNode;
  text?: string;
  title: string;
  observations: string;
}) {
  const form = useForm<InputType>({
    resolver: zodResolver(createClientSchema),
    defaultValues: {
      fullName: "",
      email: "client@example.com",
      phoneNumber: "",
      observations: "",
    },
  });

  //! Create Client
  const { isCreating, createClient } = useCreateClient();

  //! Submit form
  const onSubmit = (data: InputType) => {
    createClient(data);
    form.reset();
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button className="flex justify-start text-left gap-2">
            {icon} {text}
          </Button>
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{observations}</SheetDescription>
          </SheetHeader>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-3 sm:gap-8 mt-10"
            >
              <ClientFormInput
                name="fullName"
                label="Full Name"
                placeholder="Full Name"
                formControl={form.control}
              />

              <ClientFormInput
                name="email"
                label="Email"
                placeholder="Email"
                formControl={form.control}
              />

              <ClientFormInput
                name="phoneNumber"
                label="Phone Number"
                placeholder="Phone Number"
                formControl={form.control}
              />

              <ClientFormInput
                name="observations"
                label="Observations"
                placeholder="Observations"
                formControl={form.control}
              />

              <SheetClose className="sm:mt-10 mt-4">
                <Button type="submit" disabled={isCreating}>
                  Create New Client
                </Button>
              </SheetClose>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
