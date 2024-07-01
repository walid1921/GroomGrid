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
        className="mt-6 ml-12 gap-2"
        onClick={() => navigate(-1)}
      >
        {" "}
        <HiMiniChevronLeft size={20} />
        Back
      </Button>

      <div className="flex flex-col h-full items-center gap-10 justify-center container">
        {" "}
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl md:text-6xl border-none">Features</h2>
          <p className="max-w-[70%] text-muted-foreground sm:leading-7 sm:text-lg">
            Discover the powerful capabilities that streamline your barbershop
            operations. From seamless booking management to client interactions.
          </p>
        </div>
        <div className="w-[40%]">
          <FeaturesAccordion />
        </div>
      </div>
    </MainAnimation>
  );
};

export default Features;
