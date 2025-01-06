import React from "react";
import { IoUnlink } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="flex fixed border w-[90%] py-2 border-white/40 mx-16 my-8 bg-[#191e24] rounded-full justify-between ">
      <div className="flex px-6 text-sky-500  font-bold text-3xl items-center ">
        <IoUnlink size={30} className="m-3 -rotate-45 " />
        Linkify
      </div>
      <div className="flex pr-6">
        <Link
          to="/login"
          className="rounded-xl  bg-sky-500 font-semibold text-xl px-3 py-3"
        >
          Login
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
