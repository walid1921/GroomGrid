import { z } from "zod";
import { Control, FieldPath } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createClientSchema } from "@/validators/createClientValidation";

type InputType = z.infer<typeof createClientSchema>;

type clientFormInputProps = {
  name: FieldPath<InputType>;
  label: string;
  placeholder: string;
  observations?: string;
  inputType?: string;
  formControl?: Control<InputType, unknown>;
};

const ClientFormInput = ({
  formControl,
  name,
  label,
  placeholder,
  observations,
  inputType,
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
              type={inputType || "text"}
              placeholder={placeholder}
              {...field}
            />
          </FormControl>
          {observations && (
            <FormDescription className="text-[12px]">
              {observations}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ClientFormInput;
