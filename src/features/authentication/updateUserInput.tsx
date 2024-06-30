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
  formControl: Control<InputType>;
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
            {isFileInput ? (
              <Input
                type="file"
                accept={accept}
                disabled={disabled}
                // onChange={(e) => field.onChange(e.target.files[0])}   it was like this before
                onChange={(e) => {
                  const files = e.target.files;
                  if (files && files[0]) {
                    field.onChange(files[0]);
                  }
                }}
              />
            ) : (
              <Input
                autoComplete={autoComplete}
                type={inputType || "text"}
                placeholder={placeholder}
                disabled={disabled}
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
