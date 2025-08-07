import React from "react";
import { useNavigate } from "react-router-dom";

const MyNotes = () => {

    const nav = useNavigate();

  return (
    <div className="min-h-screen bg-black ">
      <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-white ">
        <p className=" sm:text-3xl lg:text-4xl mb-7 font-bold" > You Didn't Create Any Notes yet</p>
        <p className="  lg:text-2xl mb-7" >Start By Creating A Note</p>
        <button onClick={()=>nav("/create-notes")} className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-45 cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          Create Note
        </span>
      </button>
       
      </div>
    </div>
  );
};

export default MyNotes;
