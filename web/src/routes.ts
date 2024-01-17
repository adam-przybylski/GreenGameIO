import { RouteObject } from "react-router-dom";
import MainPage from "./pages/main";
import Notifications from "./pages/notifications";
import UserNotifications from "./pages/userNotifications";
import AdminLayout from "./pages/admin/AdminLayout";
import GamesPage from "./pages/games/games";
import GamePage from "./pages/games/game";
import FriendPage from "./pages/friend-module";
import AwardsPage from "./pages/awards";
import Quizzes from "./pages/quiz/userQuiz";

export const UnprotectedRoutes = [
  { path: "/", Component: MainPage },
  { path: "/notifications", Component: Notifications },
  { path: "/user/notifications", Component: UserNotifications },
  { path: "/games", Component: GamesPage },
  { path: "/games/:name", Component: GamePage },
  {path: "/awards", Component: AwardsPage},
  {
    path: "/quizzes",
    Component: Quizzes,
  },
  { path: "/friends", Component: FriendPage }
] satisfies RouteObject[];
export const ProtectedRoutes = [
  
] satisfies RouteObject[];

export const AdminRoutes = [
  { path: "/admin", Component: AdminLayout },

] satisfies RouteObject[];
