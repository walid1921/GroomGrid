import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import UpdateUserInput from "./updateUserInput";
import { updateUserSchema } from "@/validators/updateUserValidation";
import { z } from "zod";
import { useUser } from "./useUser";
import useUpdateUser from "./useUpdateUser";

type InputType = z.infer<typeof updateUserSchema>;

export function UpdateUserData() {
  const { user } = useUser();

  const currentFullName = user?.user_metadata?.fullName ?? "";
  const email = user?.email ?? "";

  const { isUpdating, updateUser } = useUpdateUser();

  const form = useForm<InputType>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      fullName: currentFullName,
      email: email,
      avatar: null,
    },
  });

  function onSubmit({ fullName, avatar }: InputType) {
    if (!fullName) return;
    updateUser(
      {
        fullName,
        avatar,
      },
      {
        onSuccess: () => {
          form.reset();
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 mt-10"
      >
        <UpdateUserInput
          name="email"
          inputType="email"
          label="Email"
          autoComplete="username"
          formControl={form.control}
          disabled
        />
        <UpdateUserInput
          name="fullName"
          inputType="text"
          label="Full Name"
          autoComplete="name"
          formControl={form.control}
          disabled={isUpdating}
        />
        <UpdateUserInput
          label="Avatar"
          name="avatar"
          accept="image/*"
          formControl={form.control}
          disabled={isUpdating}
        />

        <Button type="submit" disabled={isUpdating}>
          Update User Data
        </Button>
      </form>
    </Form>
  );
}
