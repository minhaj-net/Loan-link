import React, { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation, useNavigate } from "react-router";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  Calendar,
  Users,
  Clock,
} from "lucide-react";
import Navbar from "../../Components/Navbar/Navbar";
import { AuthContext } from "../../Context/AuthContext/AuthContext";
import toast from "react-hot-toast";
import { saveOrUpdateUser } from "../../Utility";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const { handleGoogleSignIn, createUser, signInUser, updateUser, setUser } =
    use(AuthContext);
  const [formData, setFormData] = useState({
    displayName: "",
    email: "",
    password: "",
    role: "",
    photoURL: "",
  });

  console.log(formData);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  console.log(formData);
  //sign up user here
  const handleSubmit = async (e) => {
    e.preventDefault();

    createUser(formData.email, formData.password)
      .then((res) => {
        const user = res.user;

        const photoURL = formData.photoURL;
        const name = formData.firstName;

        updateUser({ displayName: name, photoURL })
          .then(() => {
            // local state update (Firebase user fields অনুযায়ী)
            setUser({ ...user, displayName: name, photoURL });

            toast.success("Registration successful!");

            saveOrUpdateUser({
              name,
              email: formData.email,
              photoURL,
              role: formData.role,
            });

            setFormData({ email: "", password: "" });
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => toast.error(err.message));
  };

  const handleSignIn = (e) => {
    e.preventDefault();
    console.log("Form submitted for sign in:", formData);
    signInUser(formData.email, formData.password)
      .then((res) => {
        const user = res.user;
        console.log(user);
        toast.success("Sign in Successfull");
        setFormData({ email: "", password: "" });
        navigate(from, { replace: true });
        saveOrUpdateUser({
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL
        });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };
  const handleGoogleSignInRow = () => {
    console.log("Google sing in on CLiking:");
    handleGoogleSignIn()
      .then((res) => {
        const user = res.user;
        saveOrUpdateUser({
          name: user?.displayName,
          email: user?.email,
          photoURL: user?.photoURL,
        });
        console.log(user);
        toast.success("Google sign in successfull");
        navigate(from, { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setFormData({ firstName: "", email: "", password: "" });
  };

  return (
    <div>
      <Navbar></Navbar>
      <div className="min-h-screen bg-linear-to-br from-slate-100 via-slate-200 to-slate-300 flex items-center justify-center p-4 lg:p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-6xl bg-linear-to-br from-yellow-50 via-cream-50 to-yellow-100 rounded-3xl shadow-2xl overflow-hidden"
          style={{ backgroundColor: "#FFF8E7" }}
        >
          <div className="grid lg:grid-cols-2 min-h-[600px]">
            {/* Left Side - Form */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="p-8 lg:p-12 flex flex-col justify-center"
            >
              {/* Logo */}
              <div className="mb-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-md"
                >
                  <div className="w-8 h-8 bg-linear-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-sm">C</span>
                  </div>
                  <span className="font-bold text-slate-800">Crexito</span>
                </motion.div>
              </div>

              {/* Header */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-8"
              >
                <h1 className="text-3xl lg:text-4xl font-bold text-slate-800 mb-2">
                  {isLogin ? "Welcome back" : "Create an account"}
                </h1>
                <p className="text-slate-600">
                  {isLogin
                    ? "Sign in to continue"
                    : "Stay on track and get 30 day free trial"}
                </p>
              </motion.div>

              {/* Form */}
              <div className="space-y-5">
                <AnimatePresence mode="wait">
                  {!isLogin && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <label className="block text-sm font-semibold text-slate-700 mb-2">
                        First name
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                        <input
                          type="text"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          placeholder="Annette Laurent"
                          className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-slate-800 placeholder:text-slate-400"
                        />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* signUP email filed */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="annetteLaurent123@gmail.com"
                      className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-slate-800 placeholder:text-slate-400"
                    />
                  </div>
                </div>
                {/* signUP Photo url filed */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Photo URL
                    </label>
                    <div className="relative">
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png"
                        alt="Photo Icon"
                        className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
                      />
                      <input
                        type="url"
                        name="photoURL"
                        value={formData.photoURL}
                        onChange={handleInputChange}
                        placeholder="https://example.com/your-photo.jpg"
                        className="w-full pl-12 pr-4 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-slate-800 placeholder:text-slate-400"
                      />
                    </div>
                  </div>
                )}
                {/* SignUP role base imput */}
                {!isLogin && (
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Role
                    </label>
                    <div className="relative">
                      <select
                        name="role"
                        value={formData.role}
                        onChange={handleInputChange}
                        className="w-full pl-4 pr-8 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-slate-800"
                      >
                        <option value="">Select Role</option>
                        <option value="borrower">Borrower</option>
                        <option value="admin">Admin</option>
                        <option value="manager">Manager</option>
                      </select>
                    </div>
                  </div>
                )}
                {/* SignUP Password filed */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleInputChange}
                      placeholder="••••••••••••••••••"
                      className="w-full pl-12 pr-12 py-3.5 bg-white border-2 border-slate-200 rounded-xl focus:border-yellow-400 focus:outline-none transition-colors text-slate-800"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  onClick={isLogin ? handleSignIn : handleSubmit}
                  conditional
                  function
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  // onClick={handleSubmit}
                  className="w-full bg-linear-to-r from-yellow-400 via-yellow-500 to-orange-400 text-slate-800 py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
                >
                  <span>{isLogin ? "Sign In" : "Submit"}</span>
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                {/* Social Login */}
                <div>
                  <button
                    onClick={handleGoogleSignInRow}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex w-full items-center justify-center gap-2 py-3 bg-white border-2 border-slate-200 rounded-xl hover:border-slate-300 transition-colors"
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    <span className="font-semibold text-slate-700">Google</span>
                  </button>
                </div>
              </div>

              {/* Toggle Mode */}
              <div className="mt-6 text-center">
                <p className="text-slate-600">
                  {isLogin
                    ? "I don't any account? "
                    : "Already have an account? "}
                  <button
                    onClick={toggleMode}
                    className="text-slate-800 font-bold underline hover:text-yellow-600 transition-colors"
                  >
                    {isLogin ? "Sign up" : "Sign in"}
                  </button>
                </p>
              </div>

              {/* Terms */}
              <div className="mt-8 text-center">
                <p className="text-xs text-slate-500">
                  By signing up, you agree to our{" "}
                  <a
                    href="#"
                    className="text-slate-700 underline hover:text-yellow-600"
                  >
                    Terms & Conditions
                  </a>
                </p>
              </div>
            </motion.div>

            {/* Right Side - Image/Info */}
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="relative bg-linear-to-br from-slate-700 via-slate-800 to-slate-900 p-8 lg:p-12 hidden lg:flex flex-col justify-between overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0 bg-[linear-linear(rgba(255,255,255,.05)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,.05)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
              </div>

              {/* Top Notification */}
              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="relative z-10"
              >
                <div className="bg-yellow-400 rounded-2xl p-4 shadow-xl inline-flex items-start gap-3 mb-8">
                  <CheckCircle className="w-5 h-5 text-slate-800 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">
                      Task Moved: WD+ Team
                    </p>
                    <p className="text-slate-700 text-xs">Random Button</p>
                  </div>
                </div>

                {/* Calendar Widget */}
                <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-white font-semibold">Calendar</h3>
                    <Calendar className="w-5 h-5 text-white/70" />
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center mb-2">
                    {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(
                      (day) => (
                        <div
                          key={day}
                          className="text-white/50 text-xs font-medium"
                        >
                          {day}
                        </div>
                      )
                    )}
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-center">
                    {[22, 23, 24, 25, 26, 27, 28].map((date) => (
                      <div
                        key={date}
                        className={`text-sm py-1 rounded ${
                          date === 25
                            ? "bg-yellow-400 text-slate-800 font-bold"
                            : "text-white/70"
                        }`}
                      >
                        {date}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Main Image Area */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className="relative z-10 flex-1 flex items-center justify-center my-8"
              >
                <div className="relative">
                  {/* Main placeholder for business image */}
                  <div className="w-64 h-64 bg-linear-to-br from-slate-600 to-slate-700 rounded-3xl shadow-2xl flex items-center justify-center">
                    <Users className="w-24 h-24 text-white/30" />
                  </div>

                  {/* Profile Circles */}
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute -right-4 top-20 bg-white rounded-full p-1 shadow-xl"
                  >
                    <div className="w-12 h-12 bg-linear-to-br from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                      <User className="w-6 h-6 text-white" />
                    </div>
                  </motion.div>

                  <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5,
                    }}
                    className="absolute -right-2 bottom-16 bg-white rounded-full p-1 shadow-xl"
                  >
                    <div className="w-10 h-10 bg-linear-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Bottom Meeting Card */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="relative z-10"
              >
                <div className="bg-white rounded-2xl p-4 shadow-xl">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-bold text-slate-800">Cat's Meeting</h3>
                    <Clock className="w-5 h-5 text-slate-400" />
                  </div>
                  <p className="text-slate-600 text-sm mb-3">
                    10:00 - 11:00 AM
                  </p>
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-linear-to-br from-slate-300 to-slate-400 border-2 border-white"
                      />
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <div className="absolute top-1/4 right-8 w-20 h-20 bg-yellow-400/20 rounded-full blur-2xl"></div>
              <div className="absolute bottom-1/4 left-8 w-32 h-32 bg-purple-400/20 rounded-full blur-3xl"></div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
