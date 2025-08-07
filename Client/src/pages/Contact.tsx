import React from "react";
import { useNavigate } from "react-router-dom";
import ContactForm from "../Components/Contact-form";

const MyNotes = () => {


  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="w-full max-w-md p-4">
            <ContactForm />
          </div>
        </div>
  );
};

export default MyNotes;
