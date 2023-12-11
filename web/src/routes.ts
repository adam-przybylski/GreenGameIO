import { RouteObject } from "react-router-dom";
import MainPage from "./pages/main";
import AdminMain from "./pages/admin/mainAdmin";
import AdminUsers from "./pages/admin/usersAdmin";

export const UnprotectedRoutes = [
  { path: "/", Component: MainPage },
] satisfies RouteObject[];
export const ProtectedRoutes = [] satisfies RouteObject[];

export const AdminRoutes = [
  { path: "/admin", Component: AdminMain },
  { path: "/admin/users", Component: AdminUsers },
] satisfies RouteObject[];
