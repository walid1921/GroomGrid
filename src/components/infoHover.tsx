import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { Info } from "lucide-react";

export function InfoHover({ info, }: { info: string }) {
  return (
    <Popover>
      <PopoverTrigger>
        <Info size={18} />
      </PopoverTrigger>
      <PopoverContent
        align="end"
        side="top"
        className="max-w-[200px] mb-3 text-[12px] z-50 overflow-hidden rounded-md border bg-popover px-3 py-1.5 text-sm text-popover-foreground shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
      >
        {info}
      </PopoverContent>
    </Popover>
  );
}
