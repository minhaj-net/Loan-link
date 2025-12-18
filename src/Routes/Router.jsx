import { createBrowserRouter } from "react-router";
import MainLayout from "../Layout/MainLayout/MainLayout";
import Home from "../Pages/Home/Home";
import Login from "../Pages/Login/Login";
import AllLoans from "../Pages/AllLoans/AllLoans";
import LoanDetails from "../Pages/LoanDetails/LoanDetilas";
import LoanApplicationForm from "../Pages/LoanApplicationForm/LoanApplicationForm";
import DashboardLayout from "../Pages/Dashboard/DashboardLayout";
import DashboardOverview from "../Pages/Dashboard/DashboardOverView/DashboardOverView";
import ManageUsers from "../Pages/AdminDashboardPages/ManageUsers/ManageUsers";
import AllLoanAdmin from "../Pages/AdminDashboardPages/AllLoan/AllLoanAdmin";
import LoanApplications from "../Pages/AdminDashboardPages/LoanApplications/LoanApplications";
import AddLoan from "../Pages/ManagerDashboard/AddLoan/AddLoan";
import ManageLoans from "../Pages/ManagerDashboard/ManageLoans/ManageLoans";
import PendingApplications from "../Pages/ManagerDashboard/PendingApplications/PendingApplications";
import ApprovedApplications from "../Pages/ManagerDashboard/ApprovedApplications/ApprovedApplications";
import MyProfile from "../Pages/ManagerDashboard/MyProfile/MyProfile";
import MyProfileBorrower from "../Pages/BorrowerDashboardPages/MyProfile/MyProfile";
import MyLoans from "../Pages/BorrowerDashboardPages/MyLoans/MyLoans";
import UpdateLoanForm from "../Pages/AdminDashboardPages/UpdateLoand/UpdateLoand";
import UpdateLoand from "../Pages/AdminDashboardPages/UpdateLoand/UpdateLoand";
import ManagerManageLoandetail from "../Pages/ManagerDashboard/ManagerManageLoandetails/ManagerManageLoandetail";
import PrivateRoute from "./PrivateRoute";
import PaymentSuccess from "../Pages/Payment/PaymentSuccess";
import PaymentFailed from "../Pages/Payment/PaymentFailed";

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
        path: "all-loans/loan-details/:id",
        element: (
          <PrivateRoute>
            <LoanDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "all-loans/loan-details/:id/application-form",
        element: (
          <PrivateRoute>
            <LoanApplicationForm />
          </PrivateRoute>
        ),
      },
      {
         path: "payment/success",
         element: (
           <PrivateRoute>
             <PaymentSuccess />
           </PrivateRoute>
         ),
       },
       {
         path: "payment/failed",
         element: (
           <PrivateRoute>
              <PaymentFailed />
           </PrivateRoute>
         ),
       },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        index: true,
        Component: DashboardOverview,
      },
      {
        path: "manage-users",
        Component: ManageUsers,
      },
      {
        path: "all-loan",
        Component: AllLoanAdmin,
      },
      {
        path: "loan-applications",
        Component: LoanApplications,
      },
      {
        path: "add-loan",
        Component: AddLoan,
      },
      {
        path: "all-loan/update-loans/:id",
        Component: UpdateLoand,
      },
      {
        path: "manage-loans",
        Component: ManageLoans,
      },
      {
        path: "pending-loans",
        Component: PendingApplications,
      },
      {
        path:"update-loan/:id",
        Component:ManagerManageLoandetail,
      },
      {
        path: "approved-loans",
        Component: ApprovedApplications,
      },
      {
        path: "profile",
        Component: MyProfile,
      },
      {
        path: "borrower-profile",
        Component: MyProfileBorrower,
      },
      {
        path: "my-loans",
        Component: MyLoans,
      },
    ],
  },
  {
    path: "athentication",
    Component: Login,
  },
]);
