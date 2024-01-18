import { FC } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Notification from "../components/Notification";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const Layout: FC = () => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="bg-[#212121] w-full h-screen flex items-center text-white">
        <div className="w-32 h-full bg-[#121212] flex flex-col justify-center">
          <Nav />
        </div>
        <div className="flex-1 bg-transparent h-full w-full overflow-auto">
          <Outlet />
        </div>
      </div>

      <Notification />
    </>
  );
};

export default Layout;
