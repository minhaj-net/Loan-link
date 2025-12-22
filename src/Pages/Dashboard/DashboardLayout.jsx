import React, { useState } from "react";
import { Link, Outlet, useNavigate } from "react-router";
import { Icon, Menu, X } from "lucide-react";
import useRole from "../../Hooks/useRole";
import { useAuth } from "../../Hooks/useAuth";
import toast from "react-hot-toast";

// Sidebar Component
const Sidebar = () => {
  const [role] = useRole();
  const { user } = useAuth();

  return (
    <aside className="fixed left-0 top-0 h-full w-64 bg-base-200 shadow-xl z-50 flex flex-col">
      <div className="p-4 flex items-center justify-center border-b border-base-300 h-16">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          My Dashboard
        </h2>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        <ul className="menu space-y-2">
          {role === "admin" && (
            <li>
              <Link to={"manage-users"} className="w-full">
                Manage User
              </Link>
              <Link to={"all-loan"} className="w-full">
                All Loans
              </Link>
              <Link to={"loan-applications"} className="w-full">
                Loans Application
              </Link>
            </li>
          )}
          {role === "manager" && (
            <li>
              <Link to={"add-loan"} className="w-full">
                Add Loan
              </Link>
              <Link to={"manage-loans"} className="w-full">
                Manage Loans
              </Link>
              <Link to={"pending-loans"} className="w-full">
                Pending Applications
              </Link>
              <Link to={"approved-loans"} className="w-full">
                Approved Applications
              </Link>
              <Link to={"profile"} className="w-full">
                Profile
              </Link>
            </li>
          )}

          {role === "borrower" && (
            <li>
              <Link to={"borrower-profile"} className="w-full">
                My Profile
              </Link>
              <Link to={"my-loans"} className="w-full">
                My Loans
              </Link>
            </li>
          )}
        </ul>
      </div>

      <div className="p-4 border-t border-base-300">
        <div className="flex items-center gap-3 p-3 bg-base-300 rounded-lg hover:bg-base-100 transition-colors cursor-pointer">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-10">
              <img src={user?.photoURL} alt="" />
            </div>
          </div>
          <div>
            <p className="font-semibold text-sm">{user?.displayName}</p>
            <p className="text-xs text-gray-500">{user?.email}</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

// Main App Component
export default function App() {
  const { logOut } = useAuth();
  const navigate = useNavigate();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Succesfull");
        navigate("/athentication");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  return (
    <div className="min-h-screen bg-base-100">
      <Sidebar />

      <div className="flex flex-col min-h-screen ml-64">
        {/* Header on dahsboard*/}
        <section className="sticky top-0 z-30 bg-base-100 shadow-md py-4">
          <div className="flex justify-between sm:mx-2 md:mx-8">
            <div></div>
            <div className="space-x-4">
              <Link to={"/"} className="btn btn-primary">
                Go Back Home
              </Link>
              <Link onClick={handleLogOut} className="btn btn-primary">
                Logout
              </Link>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="flex-1 p-4">
          <Outlet />
        </main>
        {/* <footer>
          <Footer></Footer>
        </footer> */}
      </div>
    </div>
  );
}
