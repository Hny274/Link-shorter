import { useState } from "react";
import Navbar from "../components/navbar";
import { LuSendHorizontal } from "react-icons/lu";

const Home = () => {
  const [linkData, setLinkData] = useState({ title: "", link: "" });
  const isDisabled = !linkData.link || !linkData.title;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1d232a] text-white">
      <Navbar />
      <h1 className="text-white text-4xl font-bold text-center mb-4">
        Short Your <span className="text-sky-500">Long URLs</span>
      </h1>
      <div className="flex items-center w-[60%] bg-[#191e24] py-6 mx-auto border rounded-xl border-white/20 mt-0">
        <div className="flex flex-col w-[85%] text-white px-6">
          <label className="py-2 px-3 font-semibold text-xl">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            value={linkData.title}
            onChange={(e) =>
              setLinkData({ ...linkData, title: e.target.value })
            }
            className="flex py-2 px-3 bg-transparent border border-white/20 rounded-lg mb-2"
          />
          <label className="py-2 px-3 font-semibold text-xl">Link</label>
          <input
            type="text"
            id="link"
            name="link"
            placeholder="Enter Link"
            value={linkData.link}
            onChange={(e) => setLinkData({ ...linkData, link: e.target.value })}
            className="flex py-2 px-3 bg-transparent border border-white/20 rounded-lg mb-2"
          />
        </div>
        <div className="flex justify-center items-center ml-4">
          <LuSendHorizontal
            size={30}
            className={`cursor-pointer ${
              isDisabled
                ? "text-gray-500 cursor-not-allowed"
                : "text-sky-500 hover:text-sky-600"
            }`}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
