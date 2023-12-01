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
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      ...UnprotectedRoutes,
      { path: "/", Component: AuthRouteGuard, children: ProtectedRoutes },
    ],
  },
] satisfies RouteObject[]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
