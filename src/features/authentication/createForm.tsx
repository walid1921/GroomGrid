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
import { signupUserSchema } from "@/validators/signupUserValidation";
import useSignup from "./useSignup";

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

  const { signup, isPending } = useSignup();

  //! Submit form

  const onSubmit = ({ fullName, email, password }: InputType) => {
    signup(
      { fullName, email, password },
      {
        onSettled: () => {
          form.reset();
        },
      }
    );
  };

  return (
    <>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            size="sm"
            variant="ghost"
            className={`flex justify-start text-left gap-2 hover:text-primary-foreground  border border-[#3ecf8e4d] hover:bg-[#3ecf8e80] ${bgPrimary}`}
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
                disabled={isPending}
              />
              <UserFormInput
                name="email"
                inputType="email"
                label="Email"
                autoComplete="username"
                formControl={form.control}
                disabled={isPending}
              />
              <UserFormInput
                name="password"
                inputType="password"
                label="Password"
                autoComplete="new-password"
                formControl={form.control}
                disabled={isPending}
              />
              <UserFormInput
                name="passwordConfirmation"
                inputType="password"
                label="Repeat password"
                autoComplete="new-password"
                formControl={form.control}
                disabled={isPending}
              />

              <SheetClose className="mt-10">
                <Button type="submit" disabled={isPending} className="hover:text-primary-foreground  border border-[#3ecf8e4d] hover:bg-[#3ecf8e80]">
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