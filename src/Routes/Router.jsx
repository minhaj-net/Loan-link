import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import AllLoans from "../Pages/AllLoans/AllLoans";
import LoanDetails from "../Pages/LoanDetails/LoanDetilas";
import LoanApplicationForm from "../Pages/LoanApplicationForm/LoanApplicationFor";

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
      {
        path:"all-loans/loan-details/:id",
        Component:LoanDetails
      },
      {
        path:"all-loans/loan-details/:id/application-form",
        Component:LoanApplicationForm
      }
    ],
  },

  {
    path: "athentication",
    Component: Login,
  },
]);
