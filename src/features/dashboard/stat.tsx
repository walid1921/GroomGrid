import { InfoHover } from "@/components/infoHover";

import React from "react";

type StatProps = {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  color: "blue" | "yellow" | "green"; // List out all possible colors you might use
  info: string;
};

const Stat: React.FC<StatProps> = ({ icon, title, value, color, info }) => {
  const colorClasses = {
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-700",
    },
    yellow: {
      bg: "bg-yellow-200",
      text: "text-yellow-700",
    },
    green: {
      bg: "bg-green-100",
      text: "text-green-700",
    },
  };

  return (
    <div className=" relative flex shadow-md bg-background rounded-lg p-3 sm:p-6 gap-6 items-center">
      <div
        className={`flex items-center justify-center rounded-full w-12 h-12 ${colorClasses[color].bg}`}
      >
        <div
          className={`flex items-center justify-center w-6 h-6 ${colorClasses[color].text}`}
        >
          {icon}
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h5 className="text-xs uppercase tracking-wide font-semibold text-gray-400">
          {title}
        </h5>
        <span className="text-xl sm:text-3xl leading-none font-bold text-gray-300">
          {value}
        </span>
      </div>
      <div className="absolute right-6 top-3  h-full">
        {" "}
        <InfoHover info={info} />
      </div>
    </div>
  );
};

export default Stat;
