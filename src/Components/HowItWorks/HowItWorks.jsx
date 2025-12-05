import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  Search, 
  CheckCircle, 
  Wallet,
  ArrowRight,
  Clock,
  Shield,
  Zap,
  User,
  CreditCard,
  TrendingUp
} from 'lucide-react';

const HowItWorks = () => {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Fill Application",
      description: "Complete our simple online loan application form with your basic details and required documents.",
      detailedInfo: "Our streamlined application process takes just 5 minutes. You'll need your ID, proof of income, and address verification.",
      icon: FileText,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      features: ["Quick Form", "Secure Upload", "No Paperwork"]
    },
    {
      id: 2,
      title: "Get Verified",
      description: "Our AI-powered system instantly verifies your documents and credit score for fast approval.",
      detailedInfo: "Advanced verification technology checks your eligibility in real-time. Most applications are verified within 30 minutes.",
      icon: Search,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      iconBg: "bg-purple-100",
      iconColor: "text-purple-600",
      features: ["Instant Check", "AI Powered", "Credit Score"]
    },
    {
      id: 3,
      title: "Loan Approved",
      description: "Receive instant approval notification with your personalized loan offer and interest rate.",
      detailedInfo: "Get approved within hours, not days. We'll email you the loan terms, repayment schedule, and next steps.",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      iconBg: "bg-green-100",
      iconColor: "text-green-600",
      features: ["Fast Approval", "Best Rates", "Transparent"]
    },
    {
      id: 4,
      title: "Get Your Funds",
      description: "Money is transferred directly to your bank account within 24 hours of approval.",
      detailedInfo: "Once you accept the offer, funds are deposited via direct bank transfer. Use the money for any purpose you need.",
      icon: Wallet,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-600",
      features: ["24hr Transfer", "Direct Deposit", "Zero Hassle"]
    }
  ];

  const benefits = [
    { icon: Clock, text: "24/7 Application", color: "text-blue-600" },
    { icon: Shield, text: "100% Secure", color: "text-green-600" },
    { icon: Zap, text: "Instant Approval", color: "text-yellow-600" },
    { icon: TrendingUp, text: "Best Rates", color: "text-purple-600" }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <section className="py-16 lg:py-24 bg-linear-to-br from-white via-slate-50 to-blue-50 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        
        {/* Animated dots pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute w-2 h-2 bg-slate-400 rounded-full top-10 left-10 animate-ping"></div>
          <div className="absolute w-2 h-2 bg-slate-400 rounded-full top-20 right-20 animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute w-2 h-2 bg-slate-400 rounded-full bottom-20 left-1/4 animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute w-2 h-2 bg-slate-400 rounded-full bottom-10 right-1/3 animate-ping" style={{ animationDelay: '3s' }}></div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 lg:mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, damping: 15 }}
            className="inline-flex items-center gap-2 bg-linear-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm"
          >
            <Zap className="w-4 h-4" />
            <span>Simple Process</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
            How It <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Works</span>
          </h2>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Get your loan in 4 simple steps. Fast, secure, and completely online process
          </p>
        </motion.div>

        {/* Steps Container */}
        <div className="max-w-7xl mx-auto">
          {/* Desktop Timeline View */}
          <div className="hidden lg:block mb-16">
            <div className="relative">
              {/* Connection Line */}
              <div className="absolute top-24 left-0 right-0 h-1 bg-linear-to-r from-blue-200 via-purple-200 to-orange-200"></div>
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${(activeStep / (steps.length - 1)) * 100}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute top-24 left-0 h-1 bg-linear-to-r from-blue-500 via-purple-500 to-orange-500 z-10"
              ></motion.div>

              {/* Steps */}
              <div className="grid grid-cols-4 gap-4">
                {steps.map((step, index) => {
                  const IconComponent = step.icon;
                  const isActive = activeStep === index;

                  return (
                    <motion.div
                      key={step.id}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.2, duration: 0.5 }}
                      onHoverStart={() => setActiveStep(index)}
                      className="relative"
                    >
                      {/* Step Number Badge */}
                      <motion.div
                        animate={{
                          scale: isActive ? 1.1 : 1,
                          y: isActive ? -5 : 0
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="relative z-20 mx-auto w-48 h-48 flex items-center justify-center mb-6"
                      >
                        <div className={`absolute inset-0 ${step.bgColor} rounded-full ${isActive ? 'animate-pulse' : ''}`}></div>
                        <div className={`relative w-40 h-40 rounded-full ${step.iconBg} flex items-center justify-center shadow-lg ${isActive ? 'shadow-2xl' : ''} transition-all duration-300`}>
                          <div className="text-center">
                            <IconComponent className={`w-16 h-16 ${step.iconColor} mx-auto mb-2`} />
                            <span className={`text-2xl font-bold ${step.iconColor}`}>{String(index + 1).padStart(2, '0')}</span>
                          </div>
                        </div>
                      </motion.div>

                      {/* Step Content */}
                      <motion.div
                        animate={{
                          y: isActive ? -10 : 0
                        }}
                        transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        className="text-center"
                      >
                        <h3 className={`text-xl font-bold mb-2 transition-colors duration-300 ${isActive ? step.iconColor : 'text-slate-800'}`}>
                          {step.title}
                        </h3>
                        <p className="text-slate-600 text-sm mb-3">
                          {step.description}
                        </p>
                        
                        {/* Features */}
                        <div className="flex flex-wrap gap-1 justify-center">
                          {step.features.map((feature, idx) => (
                            <span
                              key={idx}
                              className={`text-xs px-2 py-1 rounded-full ${step.bgColor} ${step.iconColor} font-medium`}
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Mobile/Tablet Vertical View */}
          <div className="lg:hidden space-y-6">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, x: -50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  <div className="flex gap-4 items-start">
                    {/* Step Number & Icon */}
                    <div className="relative flex-shrink-0">
                      <div className={`w-20 h-20 rounded-2xl ${step.iconBg} flex items-center justify-center shadow-lg relative z-10`}>
                        <IconComponent className={`w-10 h-10 ${step.iconColor}`} />
                      </div>
                      <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-linear-to-r ${step.color} flex items-center justify-center text-white font-bold text-sm shadow-md z-20`}>
                        {index + 1}
                      </div>
                      
                      {/* Connecting Line */}
                      {index < steps.length - 1 && (
                        <div className={`absolute top-20 left-10 w-0.5 h-16 bg-linear-to-b ${step.color} opacity-30`}></div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                      <h3 className={`text-xl font-bold mb-2 bg-linear-to-r ${step.color} bg-clip-text text-transparent`}>
                        {step.title}
                      </h3>
                      <p className="text-slate-600 text-sm mb-3">
                        {step.description}
                      </p>
                      
                      {/* Features */}
                      <div className="flex flex-wrap gap-2">
                        {step.features.map((feature, idx) => (
                          <span
                            key={idx}
                            className={`text-xs px-3 py-1 rounded-full ${step.bgColor} ${step.iconColor} font-medium`}
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Benefits Bar */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-16 bg-white rounded-2xl shadow-xl p-6 lg:p-8"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, index) => {
              const IconComponent = benefit.icon;
              
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="flex flex-col items-center text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    className={`w-16 h-16 rounded-xl bg-linear-to-br from-slate-50 to-slate-100 flex items-center justify-center mb-3 shadow-md group-hover:shadow-lg transition-all duration-300`}
                  >
                    <IconComponent className={`w-8 h-8 ${benefit.color}`} />
                  </motion.div>
                  <p className="font-semibold text-slate-800">{benefit.text}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3 group"
          >
            <User className="w-6 h-6" />
            <span>Start Your Application</span>
            <motion.div
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <ArrowRight className="w-6 h-6" />
            </motion.div>
          </motion.button>
          
          <p className="text-slate-500 text-sm mt-4">
            <CreditCard className="w-4 h-4 inline mr-1" />
            No credit card required • Get approved in minutes
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;