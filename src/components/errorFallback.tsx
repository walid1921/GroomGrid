import { Button } from "@/components/ui/button";

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <main className="h-screen bg-gray-50 flex items-center justify-center p-12">
      <div className="bg-white border border-gray-100 rounded-md p-12 flex flex-col items-center text-center ">
        <h1 className="mb-4 text-4xl font-bold text-gray-600">
          Something went wrong 🧐
        </h1>
        <p className=" text-gray-400 mb-8">{error.message}</p>
        <Button onClick={resetErrorBoundary}>Try again</Button>
      </div>
    </main>
  );
};

export default ErrorFallback;
