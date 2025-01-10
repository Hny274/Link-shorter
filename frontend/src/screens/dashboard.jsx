import React from "react";
import Navbar from "../components/navbar";
import LinkCard from "../components/linkCard";

const dashboard = () => {
  return (
    <div className="flex flex-col justify-center items-center bg-[#1d232a] h-screen w-full">
      <Navbar />
      <h1 className="text-3xl mb-4 font-bold text-white text-center">
        Your Links
      </h1>
      <LinkCard />
    </div>
  );
};

export default dashboard;
