import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

const FormSchema = z.object({
  confirmPaid: z.boolean().default(false).optional(),
});

export function CheckBoxConfirm({
  handleCheckin,
  bookingId,
  clientName,
  amount,
  checked,
  id,
  onChange,
  disabled = false,
  disabledConfirm,
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confirmPaid: false,
    },
  });

  function onSubmit() {
    handleCheckin();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="confirmPaid"
          render={() => (
            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  id={id}
                  checked={checked}
                  onCheckedChange={onChange}
                  disabled={disabled}
                />
              </FormControl>

              <FormLabel>
                I confirm that{" "}
                <span className="font-bold text-white">{clientName}</span> has
                paid the total amount of{" "}
                <span className="font-bold text-white">{amount}</span>
              </FormLabel>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          onClick={handleCheckin}
          disabled={disabledConfirm}
        >
          Check in booking #{bookingId}
        </Button>
      </form>
    </Form>
  );
}
