import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Row } from "@/components/row";

function Dashboard() {
  return (
    <>
      <Row variant="vertical">
        <h1>walid</h1>
        <p className="muted">safasf</p>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button>Hover</Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Row>
    </>
  );
}

export default Dashboard;
