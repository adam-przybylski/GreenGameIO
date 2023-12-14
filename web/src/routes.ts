import { RouteObject } from "react-router-dom";
import MainPage from "./pages/main";
import Notifications from "./pages/notifications";
import UserNotifications from "./pages/userNotifications";
import AdminLayout from "./pages/admin/AdminLayout";

export const UnprotectedRoutes = [
  { path: "/", Component: MainPage },
  { path: "/notifications", Component: Notifications },
  { path: "/user/notifications", Component: UserNotifications },
   { path: "/login", Component: LoginPage },
  { path: "/games", Component: GamesPage },
  { path: "/games/:name", Component: GamePage },
] satisfies RouteObject[];
export const ProtectedRoutes = [] satisfies RouteObject[];

export const AdminRoutes = [
  { path: "/admin", Component: AdminLayout },
] satisfies RouteObject[];
