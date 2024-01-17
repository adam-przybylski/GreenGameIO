import { RouteObject } from "react-router-dom";
import MainPage from "./pages/main";
import Notifications from "./pages/notifications";
import UserNotifications from "./pages/userNotifications";
import UserTasks from "./pages/userTasks";
import AdminLayout from "./pages/admin/AdminLayout";
import GamesPage from "./pages/games/games";
import GamePage from "./pages/games/game";
import FriendPage from "./pages/friend-module";
import AwardsPage from "./pages/awards";
import Quizzes from "./pages/quiz/userQuiz";
import Account from "./pages/account";


export const UnprotectedRoutes = [
  { path: "/", Component: MainPage },
  { path: "/notifications", Component: Notifications },
  { path: "/user/notifications", Component: UserNotifications },
  { path: "/user/tasks", Component: UserTasks },
  { path: "/games", Component: GamesPage },
  { path: "/games/:name", Component: GamePage },
  { path: "/awards", Component: AwardsPage },
  { path: "/quizzes", Component: Quizzes, },
  { path: "/account", Component: Account },

] satisfies RouteObject[];
export const ProtectedRoutes = [
  { path: ":id/friends", Component: FriendPage },
] satisfies RouteObject[];

export const AdminRoutes = [
  { path: "/admin", Component: AdminLayout },

] satisfies RouteObject[];
