import { FC } from "react";
import { Navigate, Outlet } from "react-router-dom";

const AuthRouteGuard: FC = () => {
  const token = localStorage.getItem("token");
  return <>{token ? <Outlet /> : <Navigate to={"/login"} />}</>;
};

export default AuthRouteGuard;
