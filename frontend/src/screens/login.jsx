import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_LINK } from "../utils/base-api";
import axios from "axios";
import toast from "react-hot-toast";
import Navbar from "../components/navbar";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const LoginHandler = async () => {
    try {
      const resp = await axios.post(`${BACKEND_LINK}/auth/login`, data, {
        withCredentials: true,
      });
      toast.dismiss();
      toast.success(resp.data.message);
      localStorage.setItem("token", resp.data.data.token);
      navigate("/");
    } catch (error) {
      toast.dismiss();
      if (error.response) toast.error(error.response?.data?.message);
      else toast.error("Something went wrong!");
      console.log("Login error\n", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full  flex flex-col justify-center item-center h-screen ">
        <form
          className=" w-4/12 border flex flex-col bg-[#191e24] justify-center item-center text-white mx-auto border-white rounded-xl mt-10 p-6 "
          onSubmit={(e) => e.preventDefault()}
        >
          <h1 className="my-2 font-semibold text-2xl  text-sky-500 mx-auto">
            Login Now!
          </h1>
          <div className="flex flex-col mb-3">
            <label className="text-xl py-2">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Email ID"
              value={data.email}
              className="px-3 py-2 rounded-lg bg-transparent border border-white/20 "
              onChange={(e) => setData({ ...data, email: e.target.value })}
            ></input>
          </div>
          <div className="flex flex-col ">
            <label className="text-xl py-2 ">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={data.password}
              className="px-3 py-2 rounded-lg bg-transparent border border-white/20"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            ></input>
          </div>
          <Link
            to="/forget-password"
            className="text-sky-500 mt-4 mb-3 flex justify-end"
          >
            Forgot Password?
          </Link>
          <button
            className="px-4 py-2 mt-4 mx-auto rounded-lg bg-sky-500 "
            onClick={LoginHandler}
          >
            Login Now!
          </button>
          <Link to="/register" className="mx-auto mt-4 mb-3">
            Don't have an account ? Register Now!
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Login;
