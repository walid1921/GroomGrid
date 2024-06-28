import { z } from "zod";
import { Control, FieldPath, useController } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updatePasswordSchema } from "@/validators/updatePasswordValidation";

type InputType = z.infer<typeof updatePasswordSchema>;

type UserFormInputProps = {
  name: FieldPath<InputType>;
  label: string;
  placeholder?: string;
  inputType?: string;
  autoComplete?: string;
  disabled?: boolean;
  accept?: string;
  formControl: Control<InputType>;
};

const PasswordInput = ({
  formControl,
  name,
  label,
  placeholder,
  inputType,
  disabled,
  autoComplete,
}: UserFormInputProps) => {
  const { field } = useController({
    name,
    control: formControl,
  });

  return (
    <FormField
      control={formControl}
      name={name}
      render={() => (
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

export default PasswordInput;
