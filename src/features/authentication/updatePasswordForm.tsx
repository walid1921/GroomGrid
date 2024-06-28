import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import useUpdateUser from "./useUpdateUser";
import { updatePasswordSchema } from "@/validators/updatePasswordValidation";
import PasswordInput from "./passwordInput";

type InputType = z.infer<typeof updatePasswordSchema>;

export function UpdatePasswordForm() {
  const { isUpdating, updateUser } = useUpdateUser();

  const form = useForm<InputType>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: {
      password: "",
      newPasswordConfirmation: "",
    },
  });

  function onSubmit(data: InputType) {
    updateUser(
      {
        password: data.password,
      },
      {
        onSuccess: () => {
          form.reset({
            password: "",
            newPasswordConfirmation: "",
          });
        },
      }
    );
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-8 "
      >
        <PasswordInput
          name="password"
          inputType="password"
          label="New Password"
          formControl={form.control}
          disabled={isUpdating}
        />
        <PasswordInput
          name="newPasswordConfirmation"
          inputType="password"
          label="Confirm New Password"
          formControl={form.control}
          disabled={isUpdating}
        />

        <Button
          type="submit"
          disabled={isUpdating}
          className="border border-[#3ecf8e4d] hover:bg-[#3ecf8e80]"
        >
          Update Password
        </Button>
      </form>
    </Form>
  );
}
