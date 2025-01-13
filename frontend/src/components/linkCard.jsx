import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const LinkCard = ({ title, uniqueId, longUrl, clicks, flag }) => {
  const deleteHandler = () => {};
  return (
    <div className="flex  w-[70%] bg-[#191e24] h-auto border rounded-xl border-white/30">
      <div className="flex flex-col m-2 w-[80%]">
        <h1 className="py-2 px-3 font-semibold text-xl text-white">
          Title : {title}
        </h1>
        <Link
          to={import.meta.env.VITE_FRONTEND_LINK + "/" + uniqueId}
          target="_blank"
          className="py-2 px-3 cursor-pointer font-semibold text-xl text-sky-500"
        >
          <span className="text-white"> Short Url : </span>
          {import.meta.env.VITE_FRONTEND_LINK + "/" + uniqueId}
        </Link>
        <Link
          to={longUrl}
          target="_blank"
          className="py-2 px-3 cursor-pointer font-semibold text-xl text-sky-500"
        >
          <span className="text-white"> Long Url : </span>
          {longUrl}
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center w-[10%] ">
        <p className="font-semibold text-white text-xl">Clicks</p>
        <p className="font-semibold text-white text-xl">{clicks}</p>
      </div>
      <div className="flex w-[10%] justify-center items-center">
        <span className="cursor-pointer p-2" onClick={deleteHandler}>
          <MdOutlineDeleteOutline size={30} className="text-sky-500" />
        </span>
      </div>
    </div>
  );
};

export default LinkCard;
