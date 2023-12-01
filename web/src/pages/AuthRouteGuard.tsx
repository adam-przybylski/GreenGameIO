import { FC } from "react";
import { Outlet } from "react-router-dom";

const AuthRouteGuard: FC = () => {
  //TODO: add guard implementation
  return <Outlet />;
};

export default AuthRouteGuard;
