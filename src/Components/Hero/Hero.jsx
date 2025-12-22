import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, CreditCard, Wallet, PiggyBank, TrendingUp } from 'lucide-react';

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);

  const slides = [
    {
      title: "Easy Way to See Your Balance in Your Card",
      subtitle: "What we noticed in our research is that many, if not most, bank websites look outdated.",
      primaryBtn: "Open Account",
      secondaryBtn: "How It Works",
      icon: CreditCard,
      color: "from-green-400 to-emerald-500",
      accentColor: "bg-green-500"
    },
    {
      title: "Apply for Your Dream Loan Today",
      subtitle: "Get instant approval with our streamlined process. Fast, secure, and hassle-free loan applications.",
      primaryBtn: "Apply for Loan",
      secondaryBtn: "Learn More",
      icon: Wallet,
      color: "from-blue-400 to-cyan-500",
      accentColor: "bg-blue-500"
    },
    {
      title: "Start Saving for Your Future",
      subtitle: "Build your wealth with our high-yield savings accounts. Your money grows while you sleep.",
      primaryBtn: "Start Saving",
      secondaryBtn: "View Plans",
      icon: PiggyBank,
      color: "from-purple-400 to-pink-500",
      accentColor: "bg-purple-500"
    },
    {
      title: "Invest Smart, Grow Faster",
      subtitle: "Take control of your financial future with our expert investment guidance and tools.",
      primaryBtn: "Start Investing",
      secondaryBtn: "Explore Options",
      icon: TrendingUp,
      color: "from-orange-400 to-red-500",
      accentColor: "bg-orange-500"
    }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentSlide ? 1 : -1);
    setCurrentSlide(index);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const IconComponent = slides[currentSlide].icon;

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Decorative Background Elements and effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -top-20 -left-20 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
          className="absolute -bottom-20 -right-20 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30"
        />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="relative h-[600px] sm:h-[500px] lg:h-[600px]">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute inset-0"
            >
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center h-full">
                {/* Left Content */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="space-y-6 text-center lg:text-left order-2 lg:order-1"
                >
                  <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-800 leading-tight"
                  >
                    {slides[currentSlide].title}
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="text-base sm:text-lg text-slate-600 max-w-xl mx-auto lg:mx-0"
                  >
                    {slides[currentSlide].subtitle}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                    className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                  >
                    <button className={`px-8 py-3 bg-gradient-to-r ${slides[currentSlide].color} text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300`}>
                      {slides[currentSlide].primaryBtn}
                    </button>
                    <button className="px-8 py-3 bg-white text-slate-700 font-semibold rounded-full border-2 border-slate-300 hover:border-slate-400 hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                      {slides[currentSlide].secondaryBtn}
                    </button>
                  </motion.div>
                </motion.div>

                {/* Right Illustration */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="relative order-1 lg:order-2"
                >
                  <div className="relative w-full max-w-md mx-auto">
                    {/* Phone Mockup */}
                    <motion.div
                      animate={{
                        y: [0, -20, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="relative z-10"
                    >
                      <div className="bg-slate-800 rounded-[3rem] p-3 shadow-2xl mx-auto w-64 sm:w-72">
                        <div className="bg-white rounded-[2.5rem] overflow-hidden">
                          {/* Phone Notch */}
                          <div className="bg-slate-800 h-6 rounded-b-3xl mx-auto w-32"></div>
                          
                          {/* Phone Content */}
                          <div className="p-6 space-y-4">
                            <div className="flex items-center justify-between">
                              <div className="flex gap-2">
                                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                                <div className="w-8 h-8 rounded-full bg-slate-200"></div>
                              </div>
                              <IconComponent className={`w-8 h-8 text-white ${slides[currentSlide].accentColor} p-1.5 rounded-lg`} />
                            </div>
                            
                            <div className={`${slides[currentSlide].accentColor} rounded-2xl p-6 text-white space-y-2`}>
                              <div className="flex justify-between items-center">
                                <span className="text-sm opacity-90">Balance</span>
                                <span className="text-xs opacity-75">****</span>
                              </div>
                              <div className="text-3xl font-bold">$50,430</div>
                            </div>

                            <div className="grid grid-cols-3 gap-2">
                              {[1, 2, 3].map((i) => (
                                <div key={i} className="bg-slate-100 h-16 rounded-xl"></div>
                              ))}
                            </div>

                            <button className={`w-full ${slides[currentSlide].accentColor} text-white py-3 rounded-xl font-semibold`}>
                              Pay
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Decorative Card */}
                    <motion.div
                      animate={{
                        rotate: [0, 5, 0],
                        y: [0, 10, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -right-4 top-20 sm:top-24 w-48 sm:w-56"
                    >
                      <div className={`bg-gradient-to-br ${slides[currentSlide].color} rounded-2xl p-4 shadow-xl transform rotate-12`}>
                        <div className="space-y-4">
                          <div className="flex justify-between items-start">
                            <div className="w-10 h-8 bg-yellow-300 rounded"></div>
                            <div className="text-white text-xs">VISA</div>
                          </div>
                          <div className="text-white text-xs tracking-wider">
                            **** ****   **** 4352
                          </div>
                          <div className="flex justify-between text-white text-xs">
                            <span>JOHN DOE</span>
                            <span>12/25</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Decorative Plant */}
                    <motion.div
                      animate={{
                        rotate: [0, -5, 0],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                      className="absolute -left-8 bottom-20 sm:bottom-32"
                    >
                      <div className="w-16 h-24 bg-green-400 rounded-t-full opacity-60"></div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-4 right-4 flex justify-between pointer-events-none">
          <button
            onClick={prevSlide}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 group"
          >
            <ChevronLeft className="w-6 h-6 text-slate-700 group-hover:text-slate-900" />
          </button>
          <button
            onClick={nextSlide}
            className="pointer-events-auto w-12 h-12 rounded-full bg-white/80 backdrop-blur-sm shadow-lg flex items-center justify-center hover:bg-white transition-all duration-300 group"
          >
            <ChevronRight className="w-6 h-6 text-slate-700 group-hover:text-slate-900" />
          </button>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === index
                  ? 'w-8 h-3 bg-slate-700'
                  : 'w-3 h-3 bg-slate-400 hover:bg-slate-500'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;