import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  Home,
  Car,
  GraduationCap,
  Briefcase,
  Heart,
  Building2,
  ArrowRight,
  TrendingUp,
  Shield,
  Clock,
  DollarSign,
  Calendar,
} from "lucide-react";
import axios from "axios";
import { Link } from "react-router";

const AllLoans = () => {
  const [hoveredCard, setHoveredCard] = useState(null);
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);

  // Icon mapping based on category
  const categoryIcons = {
    Business: Briefcase,
    Home: Home,
    Car: Car,
    Education: GraduationCap,
    Personal: Heart,
    Property: Building2,
  };

  // linear mapping based on category
  const categorylinears = {
    Business: "from-orange-500 via-red-600 to-pink-600",
    Home: "from-blue-500 via-blue-600 to-indigo-600",
    Car: "from-purple-500 via-purple-600 to-pink-600",
    Education: "from-green-500 via-emerald-600 to-teal-600",
    Personal: "from-rose-500 via-red-600 to-rose-600",
    Property: "from-cyan-500 via-blue-600 to-indigo-600",
  };

  // Background pattern mapping
  const categoryBgPattern = {
    Business: "bg-orange-50",
    Home: "bg-blue-50",
    Car: "bg-purple-50",
    Education: "bg-green-50",
    Personal: "bg-rose-50",
    Property: "bg-cyan-50",
  };

  useEffect(() => {
    const fetchLoans = async () => {
      try {
        const response = await axios.get(
          "https://loan-link-server-sable.vercel.app/all-loans"
        );
        setLoans(response.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  // Loading skeleton
  if (loading) {
    return (
      <section className="py-16 lg:py-24 bg-linear-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="h-8 w-48 bg-slate-200 rounded-full mx-auto mb-4 animate-pulse"></div>
            <div className="h-12 w-96 bg-slate-200 rounded-lg mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 w-[500px] bg-slate-200 rounded-lg mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-white rounded-2xl overflow-hidden shadow-lg h-[600px]"
              >
                <div className="h-48 bg-slate-200 animate-pulse"></div>
                <div className="p-6 space-y-4">
                  <div className="h-6 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-20 bg-slate-200 rounded animate-pulse"></div>
                  <div className="h-10 bg-slate-200 rounded animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 lg:py-24 bg-linear-to-br from-blue-900 via-blue-900 to-blue-900 relative overflow-hidden">
       {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm"
          >
            <TrendingUp className="w-4 h-4" />
            <span>Loan Products</span>
          </motion.div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
             Loan Options
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Choose from our wide range of loan products designed to meet your
            financial needs with competitive rates and flexible terms
          </p>
        </motion.div>

        {/* Loans Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
        >
          {loans.map((loan, index) => {
            const IconComponent = categoryIcons[loan.category] || Briefcase;
            const linear =
              categorylinears[loan.category] ||
              "from-blue-500 via-blue-600 to-indigo-600";
            const bgPattern = categoryBgPattern[loan.category] || "bg-blue-50";
            const isHovered = hoveredCard === loan._id;

            return (
              <motion.div
                key={loan._id}
                variants={cardVariants}
                onHoverStart={() => setHoveredCard(loan._id)}
                onHoverEnd={() => setHoveredCard(null)}
                className="group relative"
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full flex flex-col"
                >
                  {/* Image Container */}
                  <div className="relative h-48 overflow-hidden">
                    <motion.img
                      src={loan.loanImage}
                      alt={loan.loanTitle}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    />

                    {/* linear Overlay */}
                    <div
                      className={`absolute inset-0 bg-linear-to-t ${linear} opacity-60 group-hover:opacity-70 transition-opacity duration-300`}
                    ></div>

                    {/* Icon Badge */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      className="absolute top-4 right-4 w-14 h-14 bg-white rounded-xl shadow-lg flex items-center justify-center"
                    >
                      <IconComponent
                        className={`w-7 h-7 text-${loan.category?.toLowerCase()}-600`}
                      />
                    </motion.div>

                    {/* Max Loan Badge */}
                    <motion.div
                      initial={{ x: -100, opacity: 0 }}
                      whileInView={{ x: 0, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-2 rounded-lg shadow-md"
                    >
                      <p className="text-xs text-slate-600 font-medium">
                        Max Loan
                      </p>
                      <p
                        className={`text-lg font-bold bg-linear-to-r ${linear} bg-clip-text text-transparent`}
                      >
                        ${loan.maxLimit?.toLocaleString()}
                      </p>
                    </motion.div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2 group-hover:text-transparent group-hover:bg-linear-to-r group-hover:bg-clip-text group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                      {loan.loanTitle}
                    </h3>

                    <p className="text-slate-600 text-sm mb-4 flex-1">
                      {loan.description}
                    </p>

                    {/* Loan Details */}
                    <div className="space-y-2 mb-4">
                      <div className="flex items-center gap-2 text-sm">
                        <div
                          className={`w-8 h-8 rounded-lg ${bgPattern} flex items-center justify-center`}
                        >
                          <TrendingUp className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <span className="text-slate-500 text-xs">
                            Interest Rate
                          </span>
                          <p className="font-semibold text-slate-700">
                            {loan.interestRate}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 text-sm">
                        <div
                          className={`w-8 h-8 rounded-lg ${bgPattern} flex items-center justify-center`}
                        >
                          <DollarSign className="w-4 h-4 text-slate-600" />
                        </div>
                        <div>
                          <span className="text-slate-500 text-xs">
                            Category
                          </span>
                          <p className="font-semibold text-slate-700">
                            {loan.category}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* EMI Plans Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {loan.availableEMIPlans?.map((plan, idx) => (
                        <span
                          key={idx}
                          className={`${bgPattern} text-slate-700 text-xs px-3 py-1 rounded-full font-medium flex items-center gap-1`}
                        >
                          <Calendar className="w-3 h-3" />
                          {plan}
                        </span>
                      ))}
                    </div>

                    {/* View Details Button */}
                    <Link
                    to={`loan-details/${loan._id}`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`w-full bg-linear-to-r ${linear} text-white py-3 rounded-xl font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all duration-300 group/button`}
                    >
                      <span>View Details</span>
                      <motion.div
                        animate={{ x: isHovered ? 5 : 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 10,
                        }}
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    </Link>
                  </div>

                  {/* Decorative Corner */}
                  <div
                    className={`absolute top-0 right-0 w-20 h-20 bg-linear-to-bl ${linear} opacity-10 rounded-bl-full`}
                  ></div>
                </motion.div>

                {/* Floating Badge on Hover */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{
                    opacity: isHovered ? 1 : 0,
                    y: isHovered ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 pointer-events-none"
                >
                  <div className="bg-linear-to-r from-yellow-400 to-orange-500 text-white text-xs px-4 py-1.5 rounded-full shadow-lg font-semibold flex items-center gap-1">
                    <Shield className="w-3 h-3" />
                    <span>Secure & Fast</span>
                  </div>
                </motion.div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Empty State */}
        {loans.length === 0 && !loading && (
          <div className="text-center py-12">
            <div className="text-slate-400 text-6xl mb-4">📭</div>
            <h3 className="text-2xl font-bold text-slate-700 mb-2">
              No Loans Available
            </h3>
            <p className="text-slate-600">
              Check back later for new loan options
            </p>
          </div>
        )}

        {/* Bottom CTA */}
        {loans.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12 lg:mt-16"
          >
            <p className="text-slate-600 mb-4">
              Can't find what you're looking for?
            </p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-slate-800 text-white px-8 py-3 rounded-full font-semibold hover:bg-slate-900 transition-colors duration-300 shadow-lg hover:shadow-xl"
            >
              Talk to Our Loan Expert
            </motion.button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default AllLoans;
