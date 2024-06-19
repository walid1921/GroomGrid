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
import UserFormInput from "./userFormInput";
import { signupUserSchema } from "@/validators/singupUserValidation";

type InputType = z.infer<typeof signupUserSchema>;

export function CreateForm({
  bgPrimary,
  icon,
  text,
  title,
  observations,
}: {
  icon: React.ReactNode;
  text?: string;
  title: string;
  observations: string;
  bgPrimary?: string;
}) {
  const form = useForm<InputType>({
    resolver: zodResolver(signupUserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  //! Submit form
  const onSubmit = ({ ...data }: InputType) => {
    console.log(data);
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className={`flex justify-start text-left gap-2  ${bgPrimary}`}
          >
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
              className="flex flex-col gap-8 mt-10"
            >
              <UserFormInput
                name="fullName"
                inputType="text"
                label="Full Name"
                autoComplete="name"
                formControl={form.control}
                // disabled={isPending}
              />
              <UserFormInput
                name="email"
                inputType="email"
                label="Email"
                autoComplete="username"
                formControl={form.control}
                // disabled={isPending}
              />
              <UserFormInput
                name="password"
                inputType="password"
                label="Password"
                autoComplete="new-password"
                formControl={form.control}
                // disabled={isPending}
              />
              <UserFormInput
                name="passwordConfirmation"
                inputType="password"
                label="Repeat password"
                autoComplete="new-password"
                formControl={form.control}
                // disabled={isPending}
              />

              <SheetClose className="mt-10">
                <Button type="submit" >
                  Create New User
                </Button>
              </SheetClose>
            </form>
          </Form>
        </SheetContent>
      </Sheet>
    </>
  );
}
