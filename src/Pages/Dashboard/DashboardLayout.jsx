import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Icon, Menu, X } from "lucide-react";
import { Link, Outlet } from "react-router";
import useRole from "../../Hooks/useRole";

// Sidebar Component
const Sidebar = ({ isOpen, setIsOpen }) => {
  const [role] = useRole();
  console.log(role);
  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed left-0 top-0 h-full w-70 bg-base-200 shadow-xl z-50 flex flex-col"
      >
        <div className="p-4 flex items-center justify-between border-b border-base-300">
          <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            My Dashboard
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="btn btn-ghost btn-sm btn-circle hover:rotate-90 transition-transform duration-300"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className=" flex-1 p-4">
          <ul className="menu space-y-2">
            {role === "admin" && (
              <li>
                {/* Link iteam from dashboard sidebar */}
                {/* Admin */}
                <Link to={"manage-users"} className="w-full ">
                  Manage User
                </Link>
                <Link to={"all-loan"} className="w-full ">
                  All Loans
                </Link>
                <Link to={"loan-applications"} className="w-full ">
                  Loans Application
                </Link>
              </li>
            )}
            {role === "manager" && (
              <li>
                {" "}
                {/* Manager */}
                <Link to={"add-loan"} className="w-full ">
                  Add Loan
                </Link>
                <Link to={"manage-loans"} className="w-full ">
                  Manage Loans
                </Link>
                <Link to={"pending-loans"} className="w-full ">
                  Pending Applications
                </Link>
                <Link to={"approved-loans"} className="w-full ">
                  Approved Applications
                </Link>
                <Link to={"profile"} className="w-full ">
                  Profile
                </Link>
              </li>
            )}

            {role === "borrower" && (
              <li>
                <Link to={"borrower-profile"} className="w-full ">
                  My Profile
                </Link>
                <Link to={"my-loans"} className="w-full ">
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
                <span className="text-xl">U</span>
              </div>
            </div>
            <div>
              <p className="font-semibold text-sm">User Name</p>
              <p className="text-xs text-gray-500">user@example.com</p>
            </div>
          </div>
        </div>
      </motion.aside>
    </>
  );
};

// Main App Component
export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState("dashboard");

  // const renderPage = () => {
  //   switch (currentPage) {
  //     case "dashboard":
  //       return <DashboardOverview />;
  //     case "users":
  //       return <UsersPage />;
  //     case "analytics":
  //       return <AnalyticsPage />;
  //     case "reports":
  //       return <ReportsPage />;
  //     case "settings":
  //       return <SettingsPage />;
  //     default:
  //       return <DashboardOverview />;
  //   }
  // };

  return (
    <div className="min-h-screen bg-base-100">
      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />

      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-base-100 shadow-md">
          <div className="navbar px-4">
            <div className="flex-none">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setSidebarOpen(true)}
                className="btn btn-ghost btn-circle"
              >
                <Menu className="w-6 h-6" />
              </motion.button>
            </div>
            <div className="flex-1 px-4">
              <h1 className="text-xl font-bold">Dashboard</h1>
            </div>
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
        <main className="flex-1">
          <Outlet></Outlet>
          {/* <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence> */}
        </main>
      </div>
    </div>
  );
}
