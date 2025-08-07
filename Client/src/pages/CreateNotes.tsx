import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import { Delta } from "quill"; // Import Delta type for the handler

import "react-quill/dist/quill.snow.css";

import "../CreateNote.css";

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

  const [loading, setLoading] = useState<boolean>(
    false
  );

  const handleProcedureContentChange = (
    content: string,
    delta: Delta,
    source: string,
    editor: ReactQuill.UnprivilegedEditor
  ) => {
    setCode(content);

  };
  
  return (
    <div className="min-h-screen w-full bg-black">
      <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-4xl">
          <ReactQuill
            theme="snow"
            modules={modules}
            formats={formats}
            value={code}
            onChange={handleProcedureContentChange}
            placeholder="Start writing your amazing note..."
          />
          
        </div>
        <button  onClick={()=>nav("/create-notes")} className="mt-6 relative inline-flex h-12 overflow-hidden rounded-full p-[1px]  focus:outline-none focus:ring-1 focus:ring-slate-400 focus:ring-offset-1 focus:ring-offset-slate-50">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="inline-flex h-full w-45 cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
             { loading ? <span className="w-7 h-7 rounded-full border-4 border-solid border-indigo-800 border-t-transparent animate-spin pointer-events-none" />: "Create Note"}
        </span>
      </button>
        
      </div>
    </div>
  );
};

export default CreateNote;