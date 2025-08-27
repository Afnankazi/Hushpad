import React, { useState , useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Animate from "../Components/Animate";
import { GlowingEffectDemo } from "../Components/GlowingEffectDemo";
import toast from "react-hot-toast";
import api from "../Service/api";
import {GridLoader} from "react-spinners"

const MyNotes = () => {
  const nav = useNavigate();

    interface Notes {
    id: number;
    content: string;
    ownerUsername: string;
  }

  const [notes, setNotes] = useState<Notes[]>([]);
  const [ loading , setLoading] = useState<boolean>(true);
  useEffect(() => {
    const loadingtoast = toast.loading("Getting your notes....")
   
    const getNotes = async () => {
      try {

        const { data } = await api.get("/notes");

        toast.dismiss(loadingtoast)

        if(data.length>0){
          toast.success("Your notes are here!")
        }
        setLoading(false)
        setNotes(data);
        console.log(data);
      } catch (err) {
        console.error(err);
        toast.dismiss(loadingtoast);
        toast.error("Something went wrong")
      }
    };

    getNotes();
  }, []);
   if(loading){
    return(<div className="min-h-screen bg-black "   > <GridLoader /></div>)
   }

  return (
    <div className="min-h-screen bg-black ">
      <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-white ">
        {notes.length== 0? (
          <>
            <Animate time={0.8}>
              <p className=" sm:text-3xl lg:text-4xl mb-7 font-bold">
                {" "}
                You Didn't Create Any Notes yet
              </p>
            </Animate>
            <Animate time={1}>
              <p className="  lg:text-2xl mb-7">Start By Creating A Note</p>
            </Animate>
            <Animate time={1.5}>
              <button
                onClick={() => nav("/create-notes")}
                className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50"
              >
                <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
                <span className="inline-flex h-full w-45 cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
                  Create Note
                </span>
              </button>
            </Animate>
          </>
        ) : (
          <div className="h-full mt-30 w-full overflow-y-scroll no-scrollbar scroll-smooth  "> <GlowingEffectDemo notes = {notes}/> </div>
        )}
      </div>
    </div>
  );
};

export default MyNotes;
