import React from "react";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";

const LinkCard = ({ uniqueId, longUrl, clicks, flag }) => {
  const deleteHandler = () => {};
  return (
    <div className="flex  w-[70%] bg-[#191e24] h-auto border rounded-xl border-white/30">
      <div className="flex flex-col m-2 w-[80%]">
        <Link
          to={import.meta.env.VITE_FRONTEND_LINK + "/" + uniqueId}
          target="_blank"
          className="py-2 px-3 cursor-pointer font-semibold text-xl text-sky-500"
        >
          {import.meta.env.VITE_FRONTEND_LINK + "/" + uniqueId}
        </Link>
        <Link
          to={longUrl}
          target="_blank"
          className="py-2 px-3 cursor-pointer font-semibold text-xl text-white"
        >
          {longUrl}
        </Link>
      </div>
      <div className="flex flex-col justify-center items-center w-[10%] ">
        <p className="font-semibold text-white text-lg">Clicks</p>
        <p className="font-semibold text-white text-lg">{clicks}</p>
      </div>
      <div className="flex w-[10%] justify-center items-center">
        <span className="cursor-pointer p-2" onClick={deleteHandler}>
          <MdOutlineDeleteOutline size={20} className="text-sky-500" />
        </span>
      </div>
    </div>
  );
};

export default LinkCard;
