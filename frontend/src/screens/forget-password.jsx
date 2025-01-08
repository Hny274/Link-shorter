import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_LINK } from "../../src/utils/base-api";
import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [data, setData] = useState({ email: "" });
  const navigate = useNavigate();

  const ForgetPassword = async () => {
    try {
      const resp = await axios.post(
        `${BACKEND_LINK}/auth/forget-password`,
        data
      );
      toast.dismiss();
      toast.success(resp.data.message);
      console.log(resp.data.data);
      navigate("/login");
    } catch (error) {
      toast.dismiss();
      if (error.response) toast.error(error.response?.data?.message);
      else toast.error("Something went wrong!");
      console.log("Forgot Password Error\n", error);
    }
  };
  return (
    <div className="w-full flex flex-col justify-center item-center h-screen ">
      <form
        className=" w-4/12 flex flex-col bg-[#191e24] justify-center item-center
        text-white mx-auto border-white rounded-xl mt-6 p-6 "
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="my-4 font-semibold text-2xl  text-sky-500 mx-auto">
          Forget Password
        </h1>
        <div className="flex flex-col mb-3">
          <label className="text-xl py-2">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={data.value}
            placeholder="Email ID"
            onChange={(e) => setData({ ...data, email: e.target.value })}
            className="px-3 py-2 rounded-lg bg-transparent border border-white/20 "
          ></input>
        </div>
        <button
          className="px-4 py-2 mt-4 mx-auto rounded-lg bg-sky-500 "
          onClick={ForgetPassword}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
