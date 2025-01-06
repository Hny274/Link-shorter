import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="w-full flex flex-col justify-center item-center h-screen ">
      <form
        className=" w-4/12 flex flex-col bg-[#191e24] justify-center item-center text-white mx-auto border-white rounded-xl mt-6 p-6 "
        onSubmit={(e) => e.preventDefault()}
      >
        <h1 className="my-4 font-semibold text-2xl  text-sky-500 mx-auto">
          Login Now!
        </h1>
        <div className="flex flex-col mb-3">
          <label className="text-xl py-2">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            placeholder="Email ID"
            className="px-3 py-2 rounded-lg bg-transparent border border-white/20 "
          ></input>
        </div>
        <div className="flex flex-col ">
          <label className="text-xl py-2 ">Password</label>
          <input
            type="text"
            name="password"
            id="password"
            placeholder="Password"
            className="px-3 py-2 rounded-lg bg-transparent border border-white/20"
          ></input>
        </div>
        <Link
          to="/forgot-password"
          className="text-sky-500 mt-4 mb-3 flex justify-end"
        >
          Forgot Password?
        </Link>
        <button className="px-4 py-2 mt-4 mx-auto rounded-lg bg-sky-500 ">
          Login Now!
        </button>
        <Link to="/register" className="mx-auto mt-4 mb-3">
          Don't have an account ? Register Now!
        </Link>
      </form>
    </div>
  );
};

export default Login;
