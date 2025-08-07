import React from "react";
import Heading from "../Components/Heading";
import CardSpot from "../Components/CardSpot";

const Landingpage = () => {
  return (
    <div className="h-[200vh] bg-black">
      <Heading />
      <div className="flex flex-col lg:flex-row  gap-6 w-full justify-center">
        <CardSpot />
      </div>
    </div>
  );
};

export default Landingpage;
