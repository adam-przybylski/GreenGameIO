import { FC } from "react";
import { Outlet } from "react-router-dom";

const Layout: FC = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default Layout;
