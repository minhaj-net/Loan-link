import React, { useState } from "react";
import { Link, Outlet } from "react-router";
import { Icon, Menu, X } from "lucide-react";
import useRole from "../../Hooks/useRole";
import { useAuth } from "../../Hooks/useAuth";

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
  return (
    <div className="min-h-screen bg-base-100">
      <Sidebar />

      <div className="flex flex-col min-h-screen ml-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-base-100 shadow-md h-16">
          <div className="navbar px-4 h-full">
            <div className="flex-none gap-2">
              <div className="dropdown dropdown-end">
                <button className="btn btn-ghost btn-circle">
                  <div className="indicator">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                      />
                    </svg>
                    <span className="badge badge-xs badge-primary indicator-item"></span>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </header>

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
