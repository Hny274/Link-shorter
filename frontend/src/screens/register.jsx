import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_LINK } from "../utils/base-api";
import Navbar from "../components/navbar";
import { UserContext } from "../context/user-context";

const Register = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    if (user && user.email) navigate("/");
  }, [navigate, user]);

  const RegisterHandler = async () => {
    try {
      const resp = await axios.post(`${BACKEND_LINK}/auth/register`, data);
      toast.dismiss();
      toast.success(resp.data.message);
      console.log(resp.data.data);
      navigate("/login");
    } catch (error) {
      toast.dismiss();
      if (error.response) toast.error(error.response?.data?.message);
      else toast.error("something went wrong!");
      console.log("register error!", error);
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-full flex flex-col justify-center item-center h-screen ">
        <form
          onSubmit={(e) => e.preventDefault()}
          className=" w-4/12 flex flex-col bg-[#191e24] justify-center item-center text-white mx-auto border border-white rounded-xl mt-8 p-6 "
        >
          <h1 className="my-4 font-semibold text-2xl  text-sky-500 mx-auto">
            Register Now!
          </h1>
          <div className="flex flex-col mb-3">
            <label className="text-xl py-2">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              value={data.email}
              placeholder="Email ID"
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
              value={data.password}
              placeholder="Password"
              className="px-3 py-2 rounded-lg bg-transparent border border-white/20"
              onChange={(e) => setData({ ...data, password: e.target.value })}
            ></input>
          </div>
          <button
            className="px-4 py-2 mt-4 mx-auto rounded-lg bg-sky-500 "
            onClick={RegisterHandler}
          >
            Register Now!
          </button>
          <Link to="/login" className="mx-auto mt-4 mb-3">
            Already Registered ? Login Now!
          </Link>
        </form>
      </div>
    </div>
  );
};

export default Register;
