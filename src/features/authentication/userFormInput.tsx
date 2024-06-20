import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { signupUserSchema } from "@/validators/signupUserValidation";

type InputType = z.infer<typeof signupUserSchema>;

type userFormInputProps = {
  name: FieldPath<InputType>;
  label: string;
  placeholder?: string;
  inputType?: string;
  autoComplete: string;
  disabled?: boolean;
  formControl?: Control<InputType, unknown>;
};

const UserFormInput = ({
  formControl,
  name,
  label,
  placeholder,
  inputType,
  disabled,
  autoComplete,
}: userFormInputProps) => {
  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input
              autoComplete={autoComplete}
              type={inputType || "text"}
              placeholder={placeholder}
              disabled={disabled}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UserFormInput;
