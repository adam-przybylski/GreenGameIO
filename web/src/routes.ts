import { RouteObject } from "react-router-dom";
import MainPage from "./pages/main";
import LoginPage from "./pages/login";

export const UnprotectedRoutes = [
  { path: "/", Component: MainPage },
  { path: "/login", Component: LoginPage },
] satisfies RouteObject[];
export const ProtectedRoutes = [] satisfies RouteObject[];
