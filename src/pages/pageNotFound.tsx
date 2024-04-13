import { useMoveBack } from "../hooks/useMoveBack.ts";
import { Button } from "@/components/ui/button";

function PageNotFound() {
  const moveBack = useMoveBack();

  return (
    <main className="h-screen bg-gray-50 flex items-center justify-center">
      <div className="bg-gray-100 border border-gray-200 rounded-md p-12 max-w-screen-md text-center">
        <h2 className="mb-10" >
          The page you are looking for could not be found 😢
        </h2>
        <Button onClick={moveBack} size="lg">
          &larr; Go back
        </Button>
      </div>
    </main>
  );
}

export default PageNotFound;
