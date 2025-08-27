import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Delta } from "quill"; // Import Delta type for the handler

import "react-quill/dist/quill.snow.css";

import "../CreateNote.css";
import Animate from "../Components/Animate";
import toast from "react-hot-toast";
import api from "../Service/api";
import { context } from "@react-three/fiber";
import { useNavigate, useNavigation } from "react-router-dom";

const CreateNote: React.FC = () => {

  const myColors = [
    "purple", "#785412", "#452632", "#856325", "#963254", "#254563", "white"
  ];
  

  const modules = {
    toolbar: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ align: ["right", "center", "justify"] }],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: myColors }],
      [{ background: myColors }]
    ]
  };

  const formats = [
    "header", "font", "bold", "italic", "underline", "strike", "blockquote", 
    "list", "color", "background", "align"
  ];


  const [code, setCode] = useState<string>(
    ""
  );

  const nav = useNavigate();

 

  const handleProcedureContentChange = (
    content: string,
    delta: Delta,
    source: string,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    setCode(content);

  };

  function handelSubmit(){

      if (!code || code === "<p><br></p>") {
    toast.error("Cannot create an empty note.");
    return; 
  }

    const data = {content:code}
    const req = api.post("/notes",data);
    toast.promise(req,{
      loading:"Creating Note....",
      success:"Note Created Successfully",
      error:(error)=>error || "Error Creating Note"
    }).then(()=>nav("/notes"))
  }
  
  return (
    <div className="min-h-screen w-full bg-black">
      <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <Animate time={1}>
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={code}
            onChange={handleProcedureContentChange}
            placeholder="Start writing your amazing note..."
          />
          </Animate>
          
        </div>
        <Animate time={1}>
        <button  onClick={handelSubmit} className="mt-6 relative inline-flex h-12 overflow-hidden rounded-full p-[1px]  focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-45 cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
             Create Note
        </span>
      </button>
      </Animate>
        
      </div>
    </div>
  );
};

export default CreateNote;