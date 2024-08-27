import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { BorderBeam } from "./magicui/border-beam";

import { useState, FormEvent } from "react";

// @ts-ignore
import confetti from "canvas-confetti";
import { Card } from "./ui/card";
import StarRating from "./ui/starRating";
import ShinyButton from "./magicui/shiny-button";
import { Input } from "./ui/input";

export function RatingDrawer() {
  const [serviceRating, setServiceRating] = useState<number>(0);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log(`Form submitted with rating: ${serviceRating} stars`);
    setIsSubmitted(true);
  };

  const handleRatingChange = (rating: number) => {
    setServiceRating(rating);
  };

  const handleClick = () => {
    const defaults = {
      spread: 360,
      ticks: 50,
      gravity: 0,
      decay: 0.94,
      startVelocity: 30,
      colors: ["#FFE400", "#FFBD00", "#E89400", "#FFCA6C", "#FDFFB8"],
    };

    const shoot = () => {
      confetti({
        ...defaults,
        particleCount: 40,
        scalar: 1.2,
        shapes: ["star"],
      });

      confetti({
        ...defaults,
        particleCount: 10,
        scalar: 0.75,
        shapes: ["circle"],
      });
    };

    setTimeout(shoot, 0);
    setTimeout(shoot, 100);
    setTimeout(shoot, 200);
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline">Review</Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm text-center mb-10 h-full">
          <div className="h-full">
            {isSubmitted ? (
              <div className="text-center flex flex-col justify-center items-center h-full">
                <h1 className="mb-4 text-4xl ">Thank You!</h1>
                <p className="text-lg ">We appreciate your feedback.</p>
              </div>
            ) : (
              <div>
                <DrawerHeader className="text-center">
                  <DrawerTitle>Give Your Feedback</DrawerTitle>
                  <DrawerDescription>
                    We value your opinion! Please provide a rating and share
                    your experience with us.
                  </DrawerDescription>
                </DrawerHeader>
                <Card className="w-full flex flex-col border p-4 rounded-md shadow-lg">
                  <StarRating maxRating={5} onSetRating={handleRatingChange} />
                  <p className="mt-4">
                    This service was rated {serviceRating} stars
                  </p>

                  <form onSubmit={handleSubmit} className="mt-4">
                    <Input
                      placeholder="Write your review"
                      className="bg-transparent border rounded-md px-4 py-2 mb-4 w-full"
                    />
                    {serviceRating > 0 ? (
                      <ShinyButton
                        text="Send"
                        className="bg-primary/100"
                        handleClick={handleClick}
                      />
                    ) : null}
                  </form>
                </Card>
              </div>
            )}
          <BorderBeam size={350} duration={12} delay={9} />

          </div>

        </div>
      </DrawerContent>
    </Drawer>
  );
}
