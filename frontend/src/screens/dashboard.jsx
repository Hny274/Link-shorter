import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_LINK } from "../utils/base-api";
import { UserContext } from "../context/user-context";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import LinkCard from "../components/linkCard";

const dashboard = () => {
  const [data, setData] = useState();
  const { user } = useContext(UserContext);
  const [flag, setFlag] = useState();
  const navigate = useNavigate();

  const GetAllLinks = async () => {
    try {
      const resp = await axios.get(
        `${BACKEND_LINK}/link/get-all-links/${user._id}`
      );
      toast.dismiss();
      setData(resp.data.data);
    } catch (error) {
      console.log(error.message);
      toast.dismiss();
      console.log(error);
    }
  };

  useEffect(() => {
    GetAllLinks();
  }, [user, flag]);

  return (
    <div className="flex flex-col justify-center items-center bg-[#1d232a] h-screen w-full">
      <Navbar />
      {data && data.length !== 0 && (
        <h1 className="text-3xl mb-4 font-bold text-white text-center">
          Your Links
        </h1>
      )}
      <div className="w-full overflow-y-auto pb-4">
        {data &&
          data.length !== 0 &&
          data.map((item) => {
            return (
              <LinkCard
                key={item._id}
                uniqueId={item.uniqueId}
                longUrl={item.longUrl}
                clicks={item.clicks}
                setFlag={setFlag}
              />
            );
          })}
      </div>
    </div>
  );
};

export default dashboard;
