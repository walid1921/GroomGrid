import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info } from "lucide-react";

export function InfoHover({ info }: { info: string }) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild className="cursor-pointer">
          <Info />
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-[200px] text-[12px]">{info}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
