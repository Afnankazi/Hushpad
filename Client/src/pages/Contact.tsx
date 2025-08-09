import React from "react";
import { useNavigate } from "react-router-dom";
import ContactForm from "../Components/Contact-form";
import Animate from "../Components/Animate";

const MyNotes = () => {


  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
          <div className="w-full max-w-md p-4">
            <Animate time={1}>
            <ContactForm />
            </Animate>
          </div>
        </div>
  );
};

export default MyNotes;
