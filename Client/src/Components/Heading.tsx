import React from "react";
import { TypewriterEffect } from "./ui/typewriter-effect";
import CardSpot from "../Components/CardSpot"
const Heading = () => {
  const words = [
    {
      text: "Turn",
    },
    {
      text: "Your",
    },
    {
      text: "Thoughts",
    },
    {
      text: "Into",
    },
    {
      text: "Secure,",
    },
    {
      text: "Organized",
    },
    {
      text: "Notes.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];
  return (
    <div className="w-full z-50">
      <div className="flex flex-col items-center justify-center h-[21rem] ">
        <p className=" dark:text-neutral-200 text-base  mb-10">
          The #1 Secure note-taking app
        </p>
        <TypewriterEffect words={words} />
      </div>
        
    </div>
  );
};

export default Heading;
