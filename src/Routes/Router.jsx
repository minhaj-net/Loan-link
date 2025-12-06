import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import AllLoans from "../Pages/AllLoans/AllLoans";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "all-loans",
        Component: AllLoans,
      },
    ],
  },

  {
    path: "athentication",
    Component: Login,
  },
]);
