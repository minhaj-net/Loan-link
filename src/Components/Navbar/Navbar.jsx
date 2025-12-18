import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from "framer-motion";
import { useAuth } from "../../Hooks/useAuth";
import toast from "react-hot-toast";

const Navbar = () => {
  const [theme, setTheme] = useState("light");
  const [isOpen, setIsOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const { user, logOut } = useAuth();
  const handleLogOut = () => {
    logOut()
      .then(() => {
        toast.success("Logout Succesfull");
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
  };

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", path: "/" },
    { name: "All-Loans", path: "/all-loans" },
    !user ? { name: "About Us", path: "/about" } : null,
    { name: "Contact", path: "/contact" },
  ].filter(Boolean); // removes null if user exists

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={` fixed w-full z-50 transition-all duration-300 shadow-md ${
        scrollY > 50 ? "bg-base-100/90 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <NavLink
              to="/"
              className="text-2xl flex justify-center items-center font-bold text-primary"
            >
              <img
                className="w-16 rounded-full"
                src="https://i.ibb.co.com/4nXsYmwV/eeef7f3e34a5faa9fbe6abcd641eee95.jpg"
                alt=""
              />
              <span> Link</span>
            </NavLink>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center space-x-6">
            {/* {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `relative text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-primary after:to-secondary"
                      : "text-gray-700 dark:text-gray-200 hover:text-primary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))} */}
            <NavLink
              className={({ isActive }) =>
                `relative text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-primary after:to-secondary"
                    : "text-gray-700 dark:text-gray-200 hover:text-primary"
                }`
              }
              to={"/"}
            >
              Home{" "}
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `relative text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-primary after:to-secondary"
                    : "text-gray-700 dark:text-gray-200 hover:text-primary"
                }`
              }
              to={"all-loans"}
            >
              All Loans
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `relative text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-primary after:to-secondary"
                    : "text-gray-700 dark:text-gray-200 hover:text-primary"
                }`
              }
              to={"about"}
            >
              About Us
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                `relative text-base font-medium transition-colors duration-200 ${
                  isActive
                    ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-primary after:to-secondary"
                    : "text-gray-700 dark:text-gray-200 hover:text-primary"
                }`
              }
              to={"contact"}
            >
              Contact
            </NavLink>
            {user && (
              <NavLink
                className={({ isActive }) =>
                  `relative text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "after:absolute after:-bottom-1 after:left-0 after:w-full after:h-1 after:rounded-full after:bg-gradient-to-r after:from-primary after:to-secondary"
                      : "text-gray-700 dark:text-gray-200 hover:text-primary"
                  }`
                }
                to={"dashboard"}
              >
                Dashboard
              </NavLink>
            )}
            {user && (
              <div>
                <img
                  src={user?.photoURL}
                  className="w-9 h-9 bg-white border-purple-900 border-5 rounded-full "
                  alt=""
                />
              </div>
            )}
            {user ? (
              <div>
                {" "}
                <button
                  onClick={handleLogOut}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                  className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white rounded-lg shadow-lg group bg-gradient-to-r from-blue-900 to-purple-900 hover:from-purple-900 hover:to-blue-500 transition-all duration-300"
                >
                  <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white opacity-10 rounded-full group-hover:w-56 group-hover:h-56"></span>
                  <span className="relative z-10 text-lg font-semibold tracking-wide">
                    Log Out
                  </span>
                </button>
              </div>
            ) : (
              <Link
                to={"/athentication"}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 300 }}
                className="relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium text-white rounded-lg shadow-lg group bg-gradient-to-r from-blue-900 to-purple-900 hover:from-purple-900 hover:to-blue-500 transition-all duration-300"
              >
                <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-white opacity-10 rounded-full group-hover:w-56 group-hover:h-56"></span>
                <span className="relative z-10 text-lg font-semibold tracking-wide">
                  Login
                </span>
              </Link>
            )}
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 dark:text-gray-200 focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="md:hidden bg-base-100/95 backdrop-blur-md"
        >
          <div className="px-2 pt-2 pb-4 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActive
                      ? "border-b-2 border-gradient-to-r from-primary to-secondary"
                      : "text-gray-700 dark:text-gray-200 hover:text-primary"
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}

            <button
              onClick={toggleTheme}
              className="mt-2 w-full p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 flex items-center justify-center gap-2"
            >
              {theme === "light" ? <FaMoon /> : <FaSun />}
              {theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;
