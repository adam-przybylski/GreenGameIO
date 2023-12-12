import { RouteObject } from "react-router-dom";
import MainPage from "./pages/main";
import LoginPage from "./pages/login";
import GamesPage from "./pages/games/games";
import GamePage from "./pages/games/game";

export const UnprotectedRoutes = [
  { path: "/", Component: MainPage },
  { path: "/login", Component: LoginPage },
  { path: "/games", Component: GamesPage },
  { path: "/games/:name", Component: GamePage },
] satisfies RouteObject[];
export const ProtectedRoutes = [] satisfies RouteObject[];
