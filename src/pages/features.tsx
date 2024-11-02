import { FeaturesAccordion } from "@/components/featuresAccordion";
import MainAnimation from "@/components/mainAnimation";
import { Button } from "@/components/ui/button";
import { HiMiniChevronLeft } from "react-icons/hi2";
import { useNavigate } from "react-router";

const Features = () => {
  const navigate = useNavigate();
  return (
    <MainAnimation className="min-h-screen bg-background space-y-6 pb-8 pt-6 lg:pb-32">
      <Button
        variant={"ghost"}
        size={"sm"}
        className="md:mt-6 md:ml-12 ml-4 gap-2"
        onClick={() => navigate(-1)}
      >
        {" "}
        <HiMiniChevronLeft size={20} />
        Back
      </Button>

      <div className="flex flex-col h-full items-center gap-10 justify-center md:container">
        {" "}
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl md:text-6xl border-none">Features</h2>
          
        </div>
        <div className="md:w-[40%] w-full px-8">
          <FeaturesAccordion />
        </div>
      </div>
    </MainAnimation>
  );
};

export default Features;
