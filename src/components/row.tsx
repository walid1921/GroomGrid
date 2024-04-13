import { cn } from "@/lib/utils";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import React from "react";

const rowVariants = cva("flex", {
  variants: {
    variant: {
      default: "justify-between items-center",
      vertical: "flex-col gap-[1.6rem]",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface DivProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof rowVariants> {
  asChild?: boolean;
}

const Row = React.forwardRef<HTMLDivElement, DivProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div";
    return (
      <Comp
        className={cn(rowVariants({ variant, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Row.displayName = "Row";

export { Row, rowVariants };
