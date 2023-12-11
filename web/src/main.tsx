import React from "react";
import ReactDOM from "react-dom/client";
import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import Layout from "./pages/Layout";
import { ProtectedRoutes, UnprotectedRoutes } from "./routes";
import AuthRouteGuard from "./pages/AuthRouteGuard";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import "./index.css";
import AuthenticationLayout from "./pages/AuthenticationLayout";
import AdminLayout from "./pages/AdminLayout";
import AdminMain from "./pages/admin/mainAdmin";
import AdminUsers from "./pages/admin/usersAdmin";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      ...UnprotectedRoutes,
      { path: "/", Component: AuthRouteGuard, children: ProtectedRoutes },
    ],
  },
  {
    path: "/",
    Component: AuthenticationLayout,
    children: [
      { path: "/register", Component: RegisterPage },
      { path: "/login", Component: LoginPage },
    ],
  },
  {
    path: "/",
    Component: AdminLayout,
    children: [
      { path: "/admin", Component: AdminMain },
      { path: "/admin/users", Component: AdminUsers },
    ],
  },
] satisfies RouteObject[]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
