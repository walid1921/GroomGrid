import HeroNav from "@/components/heroNav";
import MainAnimation from "@/components/mainAnimation";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import Features from "./features";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <MainAnimation className="flex flex-col h-screen">
      <HeroNav />

      <section className="flex flex-col h-full justify-center space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
        <div className="container flex flex-col justify-center text-center items-center gap-4 max-w-[64rem]">
          <Link
            to={"www.google.com"}
            className="text-sm py-1 px-4 bg-bgMain rounded-2xl "
          >
            Follow along on Twitter
          </Link>
          <h1 className="text-4x  md:text-6xl lg:text-7xl ">
            Your One-Stop Solution for Easy Bookings
          </h1>
          <p className="leading-normal sm:leading-8 text-muted-foreground sm:text-xl  max-w-[30rem]">
            From service appointments to personal engagements, our platform has
            you covered every step of the way.
          </p>

          <Button onClick={() => navigate("/login")} className="mt-10">
            {" "}
            Get Started{" "}
          </Button>
        </div>
      </section>

    </MainAnimation>
  );
};

export default Hero;
