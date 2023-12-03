import { FC } from "react";
import { Outlet } from "react-router-dom";
import Nav from "../components/Nav";

const Layout: FC = () => {
  return (
    <div className="bg-[#212121] w-full flex flex-col items-center text-white">
      <div className="w-2/3 flex-1 bg-transparent mb-32 py-5">
        <Outlet />
      </div>
      <div className="w-full h-32 bg-[#121212] flex justify-center fixed bottom-0 left-0">
        <Nav />
      </div>
    </div>
  );
};

export default Layout;
