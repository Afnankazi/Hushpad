import React from "react";
import Heading from "../Components/Heading";
import CardSpot from "../Components/CardSpot";
import {animate, motion} from "framer-motion"

const Landingpage = () => {
  return (
    <div className="h-[200vh] bg-black overflow-y-scroll no-scrollbar scroll-smooth">
      <Heading />
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3, duration:1 , ease:"easeIn" }} className="flex flex-col lg:flex-row  gap-6 w-full justify-center">
        <CardSpot />
      </motion.div>
    </div>
  );
};

export default Landingpage;
