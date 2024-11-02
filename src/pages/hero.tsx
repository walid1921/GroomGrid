import HeroNav from "@/components/heroNav";
import MainAnimation from "@/components/mainAnimation";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import oooscillate from "/oooscillate.svg";
// import { RatingDrawer } from "@/components/ratingDrawer";
import { cn } from "@/lib/utils";
import AnimatedShinyText from "@/components/magicui/animated-shiny-text";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <MainAnimation className="flex flex-col h-screen relative overflow-hidden">
      <HeroNav />

      <section className=" flex flex-col h-full justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex flex-col justify-center text-center items-center gap-4 max-w-[64rem]">
          <div className="z-10 flex items-center justify-center">
            <div
              className={cn(
                "group rounded-full border bg-neutral-100 text-base text-white transition-all ease-in hover:cursor-pointer hover:bg-neutral-200 dark:border-white/5 dark:bg-neutral-900 dark:hover:bg-neutral-800"
              )}
            >
              <AnimatedShinyText className="inline-flex items-center justify-center px-4 py-1 transition ease-out hover:text-neutral-600 hover:duration-300 hover:dark:text-neutral-400">
                <span>✨ Stay Updated on our latest services</span>
              </AnimatedShinyText>
            </div>
          </div>
          <h1 className="text-3xl  md:text-6xl lg:text-7xl mt-6">
            Your One-Stop <span className="text-[#0078BD]">Solution</span> for
            Easy Bookings
          </h1>
          <p className="leading-normal   sm:leading-8 text-muted-foreground sm:text-xl text-sm  max-w-[30rem] w-[75%] md:w-full">
            From service appointments to personal engagements, our platform has
            you covered every step of the way.
          </p>

          <Button onClick={() => navigate("/login")} className="mt-10">
            {" "}
            Get Started
          </Button>
          {/* <RatingDrawer />   its a review component, use it later */}
        </div>
      </section>

      <div className="absolute top-[250px]  h-full -z-20 overflow-hidden w-[1000px] sm:w-full">
        <img src={oooscillate} alt="" />
      </div>
      <div className="absolute -bottom-[100px] sm:-bottom-[300px] w-[600px] h-[400px] bg-[#0078BD] rounded-full blur-[250px] overflow-hidden -z-20"></div>
    </MainAnimation>
  );
};

export default Hero;
