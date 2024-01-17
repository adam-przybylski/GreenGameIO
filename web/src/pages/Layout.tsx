import { FC } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";
import Notification from "../components/Notification";

const Layout: FC = () => {
  return (
    <div className="bg-[#212121] w-full h-screen flex items-center text-white">
      <div className="w-32 h-full bg-[#121212] flex flex-col justify-center">
        <Nav />
      </div>
      <div className="flex-1 bg-transparent h-full w-full">
        <Outlet />
      </div>
      <Notification />
    </div>
  );
};

export default Layout;
