import React from "react";
import Heading from "../Components/Heading";
import CardSpot from "../Components/CardSpot";
import {animate, motion} from "framer-motion"

const Landingpage = () => {
  return (
    <div className="h-[200vh] bg-black">
      <Heading />
      <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.5, duration:1 ,type:"tween" }} className="flex flex-col lg:flex-row  gap-6 w-full justify-center">
        <CardSpot />
      </motion.div>
    </div>
  );
};

export default Landingpage;
