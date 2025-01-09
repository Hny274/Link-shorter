import React, { useState, useEffect, useContext } from "react";
import { IoUnlink } from "react-icons/io5";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../context/user-context.jsx";
import { BACKEND_LINK } from "../utils/base-api";
import axios from "axios";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const LogoutHandler = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
    toast.success("User Logged Out Successfully");
  };

  useEffect(() => {
    const GetUser = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log(token);
        const resp = await axios.get(`${BACKEND_LINK}/auth/get-user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(resp.data.data);
        console.log(resp.data.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    GetUser();
  }, []);

  return (
    <div className="flex absolute top-10 border w-[90%] py-1 mx-16 border-white/40 bg-[#191e24] rounded-full justify-between ">
      <div className="flex px-6 text-sky-500  font-bold text-3xl items-center ">
        <IoUnlink size={30} className="m-2 -rotate-45 " />
        Linkify
      </div>
      {!user?.email &&
        location.pathname !== "/login" &&
        location.pathname !== "register" && (
          <div className="flex pr-6">
            <Link
              to="/login"
              className="rounded-xl  bg-sky-500 font-semibold text-xl px-3 py-3"
            >
              Login
            </Link>
          </div>
        )}
      {user && user.email && location.pathname !== "/dashboard" && (
        <div className="flex pr-6">
          <Link
            to="/dashboard"
            className="rounded-xl  bg-sky-500 font-semibold text-xl px-3 py-3"
          >
            Dashboard
          </Link>
        </div>
      )}
      {user && location.pathname === "/dashboard" && (
        <div className="flex pr-6">
          <div
            onClick={LogoutHandler}
            className="flex rounded-xl  bg-sky-500 font-semibold text-xl px-3 py-3 "
          >
            Logout
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
