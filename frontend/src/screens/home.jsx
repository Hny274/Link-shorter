import { useState, useContext } from "react";
import Navbar from "../components/navbar";
import { LuSendHorizontal } from "react-icons/lu";
import { BACKEND_LINK } from "../utils/base-api";
import toast from "react-hot-toast";
import axios from "axios";
import { UserContext } from "../context/user-context";

const Home = () => {
  const [linkData, setLinkData] = useState({ title: "", link: "" });
  const isDisabled = !linkData.link || !linkData.title;
  const { user } = useContext(UserContext);
  const [generatedLink, setGeneratedLink] = useState(null);

  const ShortLink = async () => {
    try {
      const resp = await axios.post(`${BACKEND_LINK}/link/add-link`, {
        user: user._id,
        url: linkData.link,
        title: linkData.title,
      });
      console.log(resp.data.data);
      setGeneratedLink(resp.data.data);
      toast.dismiss();
      toast.success("Short Link generated Successfully");
    } catch (error) {
      console.log(error.message);
      toast.dismiss();
      toast.error("Something went wrong!");
    }
  };
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
            onClick={ShortLink}
            className={`cursor-pointer ${
              isDisabled
                ? "text-gray-500 cursor-not-allowed"
                : "text-sky-500 hover:text-sky-600"
            }`}
          />
        </div>
      </div>
      {generatedLink && (
        <div className="mt-6 bg-[#191e24] text-white px-6 py-4 border border-white/20 rounded-lg">
          <p className="text-lg font-semibold">Your Shortened Link:</p>
          <div
            className="relative flex justify-between items-center group cursor-pointer"
            onClick={() =>
              window.open(
                import.meta.env.VITE_FRONTEND_LINK +
                  "/" +
                  generatedLink.uniqueId
              )
            }
          >
            <p className="text-white text-sm cursor-pointer group-hover:border-b-emerald-500 group-hover:border-b-2">
              {import.meta.env.VITE_FRONTEND_LINK +
                "/" +
                generatedLink.uniqueId}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
