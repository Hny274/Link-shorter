import Navbar from "../components/navbar";
import { LuSendHorizontal } from "react-icons/lu";

const Home = () => {
  return (
    <div className="bg-pink-500 w-full ">
      <Navbar />
      <div className="flex w-[70%] my-56 mx-auto py-6 border border-black  bg-red-200 justify-center items-center">
        <div className="flex flex-col w-[90%] bg-yellow-200 ">
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Enter Title"
            className="flex "
          />
          <input type="text" id="link" name="link" placeholder="Enter Link" />
        </div>
        <div className="flex flex-col w-[10%] justify-center items-center">
          <LuSendHorizontal size={30} />
        </div>
      </div>
    </div>
  );
};

export default Home;
