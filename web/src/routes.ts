import { RouteObject } from "react-router-dom";
import MainPage from "./pages/main";
import LoginPage from "./pages/login";
import FriendPage from "./pages/friend-module";

export const UnprotectedRoutes = [
  { path: "/", Component: MainPage },
  { path: "/login", Component: LoginPage },
] satisfies RouteObject[];
export const ProtectedRoutes = [
  { path: ":id/friends", Component: FriendPage }
] satisfies RouteObject[];
