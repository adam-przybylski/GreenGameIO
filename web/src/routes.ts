import { RouteObject } from "react-router-dom";
import MainPage from "./pages/main";
import LoginPage from "./pages/login";
import AwardsPage from "./pages/awards";

export const UnprotectedRoutes = [
  { path: "/", Component: MainPage },
  { path: "/login", Component: LoginPage },
  { path: "/odznaki", Component: AwardsPage}
] satisfies RouteObject[];
export const ProtectedRoutes = [] satisfies RouteObject[];
