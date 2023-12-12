import { RouteObject } from "react-router-dom";
import MainPage from "./pages/main";
import AdminLayout from "./pages/admin/AdminLayout";

export const UnprotectedRoutes = [
  { path: "/", Component: MainPage },
] satisfies RouteObject[];
export const ProtectedRoutes = [] satisfies RouteObject[];

export const AdminRoutes = [
  { path: "/admin", Component: AdminLayout },
] satisfies RouteObject[];
