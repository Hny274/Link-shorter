import { createBrowserRouter } from "react-router-dom";
import { RouterProvider } from "react-router-dom";
import Login from "../screens/login";
import Register from "../screens/register";
import Home from "../screens/home";
import Dashboard from "../screens/dashboard";
import ForgetPassword from "../screens/forget-password";
import UpdatePassword from "../screens/update-password";
import Navbar from "./navbar";

const Body = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/forget-password",
      element: <ForgetPassword />,
    },
    {
      path: "/update-password",
      element: <UpdatePassword />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
    },
  ]);
  return (
    <div className="bg-[#191e24]">
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default Body;
