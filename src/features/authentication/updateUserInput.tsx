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
import { updateUserSchema } from "@/validators/updateUserValidation";

type InputType = z.infer<typeof updateUserSchema>;

type UserFormInputProps = {
  name: FieldPath<InputType>;
  label: string;
  placeholder?: string;
  inputType?: string;
  autoComplete?: string;
  disabled?: boolean;
  accept?: string;
  formControl?: Control<InputType, unknown>;
};

const UpdateUserInput = ({
  formControl,
  name,
  label,
  placeholder,
  inputType,
  disabled,
  autoComplete,
  accept,
}: UserFormInputProps) => {
  const isFileInput = accept?.includes("image") || accept === "image/*";

  return (
    <FormField
      control={formControl}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            {isFileInput ? (
              <Input
                autoComplete={autoComplete}
                type="file"
                placeholder={placeholder}
                disabled={disabled}
                accept={accept}
                {...field}
              />
            ) : (
              <Input
                autoComplete={autoComplete}
                type={inputType || "text"}
                placeholder={placeholder}
                disabled={disabled}
                accept={accept}
                {...field}
              />
            )}
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default UpdateUserInput;
