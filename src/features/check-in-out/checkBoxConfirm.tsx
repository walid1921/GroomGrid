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
import { formatCurrency } from "@/utils/helpers";

const FormSchema = z.object({
  confirmPaid: z.boolean().default(false).optional(),
});

type CheckBoxConfirmTypes = {
  handleCheckin: () => void;
  bookingId: number;
  clientName: string;
  amount: number;
  checked: boolean;
  onChange: () => void;
  disabled?: boolean;
  disabledConfirm?: boolean;
  checkedProduct: boolean;
  onChangeProduct: () => void;
  hasProduct: boolean;
  optionalProductPrice: number;
};

export function CheckBoxConfirm({
  handleCheckin,
  bookingId,
  clientName,
  amount,
  checked,
  onChange,
  onChangeProduct,
  disabled = false,
  disabledConfirm,
  checkedProduct,
  hasProduct,
  optionalProductPrice,
}: CheckBoxConfirmTypes) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      confirmPaid: false,
    },
  });

  function onSubmit() {
    handleCheckin();
  }
  const totalAmount = formatCurrency(amount + optionalProductPrice);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {!hasProduct && (
          <FormField
            control={form.control}
            name="confirmPaid"
            render={() => (
              <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
                <FormControl>
                  <Checkbox
                    id="product"
                    checked={checkedProduct}
                    onCheckedChange={onChangeProduct}
                  />
                </FormControl>

                <FormLabel>
                  Want to add Product for{" "}
                  <span className="font-bold text-white">
                    {formatCurrency(optionalProductPrice)}
                  </span>{" "}
                </FormLabel>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="confirmPaid"
          render={() => (
            <FormItem className="flex items-center space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox
                  id="confirm"
                  checked={checked}
                  onCheckedChange={onChange}
                  disabled={disabled}
                />
              </FormControl>

              <FormLabel>
                I confirm that{" "}
                <span className="font-bold text-white">{clientName}</span> has
                paid the total amount of{" "}
                <span className="font-bold text-white">
                  {!checkedProduct ? formatCurrency(amount) : totalAmount}
                </span>
              </FormLabel>
            </FormItem>
          )}
        />
        <Button type="submit" disabled={disabledConfirm}>
          Check in booking #{bookingId}
        </Button>
      </form>
    </Form>
  );
}
