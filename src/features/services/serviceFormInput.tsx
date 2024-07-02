import { createServiceSchema } from "@/validators/createServiceValidation";
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

type InputType = z.infer<typeof createServiceSchema>;

type ServiceFormInputProps = {
  name: FieldPath<InputType>;
  label: string;
  placeholder: string;
  description?: string;
  inputType?: string;
  formControl?: Control<InputType, unknown>;
};

const ServiceFormInput = ({
  formControl,
  name,
  label,
  placeholder,
  description,
  inputType,
}: ServiceFormInputProps) => {
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
          {description && (
            <FormDescription className="sm:text-[12px] pt-0 text-[10px]">
              {description}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default ServiceFormInput;
