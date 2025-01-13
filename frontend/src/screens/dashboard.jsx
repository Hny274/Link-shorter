import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { BACKEND_LINK } from "../utils/base-api";
import { UserContext } from "../context/user-context";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbar";
import LinkCard from "../components/linkCard";
import { IoAdd } from "react-icons/io5";

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
      console.log(resp.data.data);
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
    <div className=" bg-[#1d232a] min-h-[100vh] w-[100vw] pt-32">
      <Navbar />
      {data && data.length !== 0 && (
        <h1 className="text-3xl mb-4 font-bold text-white text-center">
          Your Links
        </h1>
      )}
      <div className="w-full pb-4 flex justify-center items-center flex-col">
        {data &&
          data.length !== 0 &&
          data.map((item) => {
            return (
              <LinkCard
                key={item._id}
                title={item.title}
                uniqueId={item.uniqueId}
                longurl={item.longurl}
                clicks={item.clicks}
                setFlag={setFlag}
              />
            );
          })}
      </div>
      {data && data.length !== 0 && (
        <button
          className="p-3 bg-sky-500 rounded-full fixed bottom-10 right-10 hover:bg-emerald-600"
          onClick={() => navigate("/")}
        >
          <IoAdd size={24} />
        </button>
      )}
      {data && data.length === 0 && (
        <div>
          <p className="text-center text-white mb-3">No Links Found!</p>
          <button
            className="bg-sky-500 px-4 py-2 rounded-md font-medium text-[#191e24] mt-2 block mx-auto hover:bg-emerald-600"
            onClick={() => navigate("/")}
          >
            Short Link Now
          </button>
        </div>
      )}
    </div>
  );
};

export default dashboard;
