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
import { loginUserSchema } from "@/validators/loginUserValidation";

type InputType = z.infer<typeof loginUserSchema>;

type clientFormInputProps = {
  name: FieldPath<InputType>;
  label: string;
  placeholder?: string;
  inputType?: string;
  autoComplete: string;
  disabled?: boolean;
  formControl?: Control<InputType, unknown>;
};

const ClientFormInput = ({
  formControl,
  name,
  label,
  placeholder,
  inputType,
  disabled,
  autoComplete,
}: clientFormInputProps) => {
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

export default ClientFormInput;
