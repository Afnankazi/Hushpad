import React from "react";
import MouseTrailDemo from "../Components/About-links";
import Animate from "../Components/Animate";
const About = () => {
  return (
    <div className="min-h-screen bg-black ">
      <div className="w-full min-h-[calc(100vh-80px)] flex flex-col items-center justify-center text-white ">
        <div className="  w-full lg:w-6xl text-white">
          <Animate time={1}>
          <div className="font-bold  text-2xl p-2   lg:text-6xl mb-2.5 mt-4">
            {" "}
            About Us
          </div>
          </Animate>
          <Animate time={2}>
          <p className="lg:text-2xl mt-4 mb-4 p-2">
            Welcome to SecureNote, your trusted companion for secure and private
            note-taking. We believe in providing a safe space where your
            thoughts and ideas are protected with the highest level of security.
            Our mission is to ensure that your notes are always accessible to
            you and only you. With state-of-the-art encryption and user-friendly
            features, SecureNote is designed to keep your information
            confidential and secure.
          </p>
          </Animate>
          <Animate time={3}>
          <MouseTrailDemo />
          </Animate>
        </div>
      </div>
    </div>
  );
};

export default About;
