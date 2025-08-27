"use client";

import { Eye } from "lucide-react";
import { GlowingEffect } from "./ui/glowing-effect";
import { useEffect, useState } from "react";
import api from "../Service/api";
import toast from "react-hot-toast";
import { da } from "zod/v4/locales";
import ReactMarkdown from "react-markdown";
export function GlowingEffectDemo() {
  interface Notes {
    id: number;
    content: string;
    ownerUsername: string;
  }

  const [notes, setNotes] = useState<Notes[]>([]);
  useEffect(() => {
    const getNotes = async () => {
      try {
        const { data } = await toast.promise(api.get("/notes"), {
          loading: "Getting your notes....",
          success: "Your notes are here!",
          error: "Something went wrong",
        });
        setNotes(data);
        console.log(data);
      } catch (err) {
        console.error(err);
      }
    };

    getNotes();
  }, []);

  return (
    <ul className="flex flex-wrap gap-6 xl:max-h-[100em] m-5 xl:ml-60 no-scroll">
      {notes.map((note: Notes, index: number) => (
 
          <GridItem
            key={index}
            icon={<Eye className="h-4 w-4 text-black dark:text-neutral-400" />}
            description={note.content}
          />
           ))}
    </ul>
  );
}

interface GridItemProps {
  icon: React.ReactNode;
  description: string;
}

const GridItem = ({ icon, description }: GridItemProps) => {
  return (
    <li className="h-[20rem] w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.5rem)] xl:w-[calc(25%-0.5rem)] list-none overflow-y-scroll no-scrollbar scroll-smooth">
      <div className="relative h-full rounded-2xl border p-2 md:rounded-3xl md:p-3 ">
        <GlowingEffect
          spread={40}
          glow={true}
          disabled={false}
          proximity={64}
          inactiveZone={0.01}
        />
        <div className="border-0.75 relative flex h-full flex-col justify-between gap-6 overflow-hidden rounded-xl p-6 md:p-6 dark:shadow-[0px_0px_27px_0px_#2D2D2D] no-scrollbar">
          <div className="relative flex flex-1 flex-col justify-between gap-3">
            <div className="space-y-3">
              <div 
                className=""
                dangerouslySetInnerHTML={{ __html: description }}
              />
              <div className="w-fit rounded-lg border border-gray-600 p-2 absolute bottom-2 right-2 ">
                {icon}
              </div>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};
