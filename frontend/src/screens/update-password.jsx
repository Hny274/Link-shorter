import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { BACKEND_LINK } from "../utils/base-api";

const UpdatePassword = () => {
  const [data, setData] = useState({ password: "", cpassword: "" });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!searchParams.get("token")) {
      toast.error("Invalid or missing token!");
      navigate("/login");
    }
  }, [navigate, searchParams]);

  const UpdatePassword = async () => {
    const token = searchParams.get("token");
    if (data.password === data.cpassword) {
      try {
        const resp = await axios.post(
          `${BACKEND_LINK}/auth/update-password?token=${token}`,
          {
            password: data.password,
          }
        );
        toast.dismiss();
        toast.success(resp.data.message);
        setData({ password: "", cpassword: "" });
        navigate("/login");
      } catch (error) {
        toast.dismiss();
        if (error.response) toast.error(error.response?.data?.message);
        else toast.error("Something Went Wrong!");
        console.log("Update Password Error\n", error);
      }
    } else {
      toast.dismiss();
      toast.error("Passwords are different!");
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
          Update Password
        </h1>
        <div className="flex flex-col mb-3">
          <label className="text-xl py-2">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="password"
            value={data.password}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            className="px-3 py-2 rounded-lg bg-transparent border border-white/20 "
          ></input>
        </div>
        <div className="flex flex-col mb-3">
          <label className="text-xl py-2">Confirm Password</label>
          <input
            type="password"
            name="cpassword"
            id="cpassword"
            placeholder="confirm password"
            value={data.cpassword}
            onChange={(e) => setData({ ...data, cpassword: e.target.value })}
            className="px-3 py-2 rounded-lg bg-transparent border border-white/20 "
          ></input>
        </div>
        <button
          className="px-4 py-2 mt-4 mx-auto rounded-lg bg-sky-500 "
          onClick={UpdatePassword}
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

export default UpdatePassword;
