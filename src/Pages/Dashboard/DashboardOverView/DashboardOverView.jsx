import { DollarSign, ShoppingCart, TrendingUp, Users } from "lucide-react";
import { Activity, useEffect } from "react";

import { motion, AnimatePresence } from "framer-motion";

const DashboardOverview = () => {
  useEffect(() => {
    // AOS animation would be initialized here
    const cards = document.querySelectorAll(".stat-card");
    cards.forEach((card, i) => {
      card.classList.add("animate__animated", "animate__fadeInUp");
      card.style.animationDelay = `${i * 0.1}s`;
    });
  }, []);

  return (
    <div className="p-6">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-6"
      >
        Dashboard Overview
      </motion.h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          {
            icon: DollarSign,
            label: "Total Revenue",
            value: "$45,231",
            change: "+12.5%",
            color: "text-green-500",
          },
          {
            icon: Users,
            label: "Total Users",
            value: "2,345",
            change: "+8.2%",
            color: "text-blue-500",
          },
          {
            icon: ShoppingCart,
            label: "Total Orders",
            value: "1,234",
            change: "+23.1%",
            color: "text-purple-500",
          },
          {
            icon: Activity,
            label: "Active Sessions",
            value: "567",
            change: "+5.4%",
            color: "text-orange-500",
          },
        ].map((stat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="stat-card card bg-base-100 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
          >
            <div className="card-body">
              <div className="flex items-center justify-between">
                <stat.icon className={`w-8 h-8 ${stat.color}`} />
                <span className="text-sm text-green-600 font-semibold">
                  {stat.change}
                </span>
              </div>
              <h3 className="text-2xl font-bold mt-2">{stat.value}</h3>
              <p className="text-sm text-gray-500">{stat.label}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
          className="card bg-base-100 shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Revenue Trend</h2>
            <div className="flex items-center justify-center h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <TrendingUp className="w-16 h-16 text-blue-400" />
            </div>
            <div className="mt-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Growth</span>
                <span className="font-semibold">+15%</span>
              </div>
              <progress
                className="progress progress-primary w-full"
                value="75"
                max="100"
              ></progress>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="card bg-base-100 shadow-lg"
        >
          <div className="card-body">
            <h2 className="card-title">Recent Activity</h2>
            <div className="space-y-3">
              {[
                {
                  text: "New user registered",
                  time: "2 min ago",
                  color: "bg-blue-500",
                },
                {
                  text: "Order #1234 completed",
                  time: "5 min ago",
                  color: "bg-green-500",
                },
                {
                  text: "Payment received",
                  time: "10 min ago",
                  color: "bg-purple-500",
                },
                {
                  text: "New message",
                  time: "15 min ago",
                  color: "bg-orange-500",
                },
              ].map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 p-2 hover:bg-base-200 rounded-lg transition-colors cursor-pointer"
                >
                  <div
                    className={`w-2 h-2 ${activity.color} rounded-full`}
                  ></div>
                  <div className="flex-1">
                    <span className="text-sm">{activity.text}</span>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
export default DashboardOverview;
