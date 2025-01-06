const ForgetPassword = () => {
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
            placeholder="Email ID"
            className="px-3 py-2 rounded-lg bg-transparent border border-white/20 "
          ></input>
        </div>
        <button className="px-4 py-2 mt-4 mx-auto rounded-lg bg-sky-500 ">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ForgetPassword;
