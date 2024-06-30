import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginUserSchema } from "@/validators/loginUserValidation";
import { z } from "zod";
import ClientFormInput from "./clientFormInput";
import { useLogin } from "./useLogin";
import SpinnerMini from "@/components/ui/spinnerMini";

type InputType = z.infer<typeof loginUserSchema>;

function LoginForm() {
  const { login, isPending } = useLogin();

  const form = useForm<InputType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //! Submit form
  const onSubmit = ({ ...data }: InputType) => {
    if (!data.email || !data.password) return;
    login(data, {
      onSettled: () => {
        // THIS IS A CALLBACK FUNCTION WHEN THE MUTATION IS SETTLED (SUCCESS OR ERROR)
        form.reset(
          {
            email: "",
            password: "",
          },
          {
            keepValues: false,
            keepDefaultValues: false,
          }
        );
      },
    });
  };

  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            <h1 className="text-3xl font-bold">Login</h1>
            <p className="text-balance text-muted-foreground">
              Enter your email below to login to your account
            </p>
          </div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <ClientFormInput
                name="email"
                inputType="email"
                label="Email"
                autoComplete="username" // this makes this form better for password managers
                formControl={form.control}
                disabled={isPending}
              />

              <ClientFormInput
                name="password"
                inputType="password"
                label="Password"
                autoComplete="current-password"
                formControl={form.control}
                disabled={isPending}
              />
              <Button type="submit" className="w-full" disabled={isPending}>
                {!isPending ? "Login" : <SpinnerMini />}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        {/* <Image
          src="/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        /> */}
      </div>
    </div>
  );
}

export default LoginForm;
