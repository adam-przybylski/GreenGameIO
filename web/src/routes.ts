import { RouteObject } from "react-router-dom";
import MainPage from "./pages/main";
import Notifications from "./pages/notifications";
import UserNotifications from "./pages/userNotifications";
import UserTasks from "./pages/userTasks";
import AdminLayout from "./pages/admin/AdminLayout";
import GamesPage from "./pages/games/games";
import GamePage from "./pages/games/game";
import FriendPage from "./pages/friend-module";
import Quizzes from "./pages/quiz/userQuiz";
import Account from "./pages/account";
import { Leaderboard } from "./pages/leaderboard/leaderboard.tsx";
import AwardsPage from "./pages/awards";

export const UnprotectedRoutes = [
  { path: "/", Component: MainPage },
  { path: "/games", Component: GamesPage },
  { path: "/games/:name", Component: GamePage },
  { path: "/quizzes", Component: Quizzes },
  { path: "/account", Component: Account },
  { path: "/leaderboard", Component: Leaderboard },
  { path: "/awards", Component: AwardsPage },
] satisfies RouteObject[];
export const ProtectedRoutes = [
  { path: "/user/notifications", Component: UserNotifications },
  {
    path: "/quizzes",
    Component: Quizzes,
  },
  { path: "/friends", Component: FriendPage },
  { path: "/user/tasks", Component: UserTasks },
] satisfies RouteObject[];

export const AdminRoutes = [
  { path: "/admin/notifications", Component: Notifications },
  { path: "/admin", Component: AdminLayout },
] satisfies RouteObject[];
