import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Star,
  Quote,
  ChevronLeft,
  ChevronRight,
  Award,
  Users,
  ThumbsUp,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const CustomerFeedback = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Small Business Owner",
      image: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      feedback: "The loan approval process was incredibly fast! I got my business loan approved within 24 hours. The interest rates were competitive and the customer service was outstanding. Highly recommend!",
      loanType: "Business Loan",
      amount: "$50,000",
      location: "New York, USA",
      verified: true
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Homeowner",
      image: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      feedback: "Finally purchased my dream home thanks to their flexible home loan options. The entire process was transparent and hassle-free. The team guided me through every step with patience and professionalism.",
      loanType: "Home Loan",
      amount: "$350,000",
      location: "California, USA",
      verified: true
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Graduate Student",
      image: "https://randomuser.me/api/portraits/women/68.jpg",
      rating: 5,
      feedback: "Their education loan helped me pursue my master's degree abroad. The repayment terms were flexible and understanding. I couldn't have achieved my dreams without their support!",
      loanType: "Education Loan",
      amount: "$75,000",
      location: "Texas, USA",
      verified: true
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Car Enthusiast",
      image: "https://randomuser.me/api/portraits/men/54.jpg",
      rating: 5,
      feedback: "Got my car loan approved in minutes! The online application was super easy and the interest rates were the best I could find. Driving my dream car now thanks to them!",
      loanType: "Car Loan",
      amount: "$45,000",
      location: "Florida, USA",
      verified: true
    },
    {
      id: 5,
      name: "Jessica Williams",
      role: "Entrepreneur",
      image: "https://randomuser.me/api/portraits/women/21.jpg",
      rating: 5,
      feedback: "Needed quick funds for my startup and they delivered! The personal loan process was smooth, no hidden charges, and the money was in my account the next day. Absolutely fantastic service!",
      loanType: "Personal Loan",
      amount: "$25,000",
      location: "Washington, USA",
      verified: true
    },
    {
      id: 6,
      name: "Robert Martinez",
      role: "Property Investor",
      image: "https://randomuser.me/api/portraits/men/67.jpg",
      rating: 5,
      feedback: "Their property loan against my existing property helped me invest in a new venture. Professional service, great rates, and quick processing. Best decision I made this year!",
      loanType: "Property Loan",
      amount: "$500,000",
      location: "Nevada, USA",
      verified: true
    }
  ];

  const stats = [
    { icon: Users, label: "Happy Customers", value: "50,000+", color: "text-blue-600" },
    { icon: Award, label: "Success Rate", value: "98%", color: "text-green-600" },
    { icon: ThumbsUp, label: "5-Star Reviews", value: "45,000+", color: "text-yellow-600" },
    { icon: TrendingUp, label: "Loans Approved", value: "$2.5B+", color: "text-purple-600" }
  ];

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isPaused) {
      const timer = setInterval(nextSlide, 5000);
      return () => clearInterval(timer);
    }
  }, [currentIndex, isPaused]);

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section className="py-16 lg:py-24 bg-linear-to-br from-blue-900 via-blue-900 to-blue-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-linear(rgba(255,255,255,.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
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
            className="inline-flex items-center gap-2 bg-blue-500/20 backdrop-blur-sm text-blue-300 px-4 py-2 rounded-full mb-4 font-semibold text-sm border border-blue-400/30"
          >
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>Customer Reviews</span>
          </motion.div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            What Our <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Customers Say</span>
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto">
            Real stories from real people who achieved their financial goals with us
          </p>
        </motion.div>

        {/* Stats Bar  for customer feedback*/}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                className="bg-white/10 backdrop-blur-md rounded-2xl p-6 border border-white/20 text-center group hover:bg-white/15 transition-all duration-300"
              >
                <IconComponent className={`w-10 h-10 ${stat.color} mx-auto mb-3 group-hover:scale-110 transition-transform duration-300`} />
                <p className="text-2xl lg:text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-slate-300 text-sm">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Main Carousel */}
        <div 
          className="relative max-w-6xl mx-auto"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative min-h-[500px] lg:min-h-[400px]">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.3 },
                  scale: { duration: 0.3 }
                }}
                className="absolute inset-0"
              >
                <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 lg:p-12 border border-white/20 shadow-2xl">
                  <div className="grid lg:grid-cols-3 gap-8 items-center">
                    {/* Left: Customer Info */}
                    <div className="lg:col-span-1 text-center lg:text-left">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="relative inline-block mb-4"
                      >
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white/30 shadow-xl mx-auto lg:mx-0">
                          <img 
                            src={currentTestimonial.image} 
                            alt={currentTestimonial.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        {currentTestimonial.verified && (
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                            className="absolute -bottom-2 -right-2 w-10 h-10 bg-linear-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                          >
                            <CheckCircle className="w-6 h-6 text-white" />
                          </motion.div>
                        )}
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold text-white mb-1">{currentTestimonial.name}</h3>
                        <p className="text-blue-300 text-sm mb-2">{currentTestimonial.role}</p>
                        <p className="text-slate-400 text-xs mb-4">{currentTestimonial.location}</p>

                        {/* Loan Info Badge */}
                        <div className="inline-flex flex-col gap-2 bg-white/5 rounded-xl p-4 border border-white/10">
                          <div className="flex items-center justify-center gap-2">
                            <Award className="w-4 h-4 text-yellow-400" />
                            <span className="text-white font-semibold text-sm">{currentTestimonial.loanType}</span>
                          </div>
                          <div className="text-2xl font-bold text-transparent bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text">
                            {currentTestimonial.amount}
                          </div>
                        </div>
                      </motion.div>
                    </div>

                    {/* Right: Feedback */}
                    <div className="lg:col-span-2">
                      <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        {/* Quote Icon */}
                        <Quote className="w-12 h-12 text-blue-400/30 mb-4" />

                        {/* Star Rating */}
                        <div className="flex gap-1 mb-4">
                          {[...Array(currentTestimonial.rating)].map((_, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + i * 0.1, type: "spring", stiffness: 200 }}
                            >
                              <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                            </motion.div>
                          ))}
                        </div>

                        {/* Feedback Text */}
                        <p className="text-white text-lg lg:text-xl leading-relaxed mb-6 italic">
                          "{currentTestimonial.feedback}"
                        </p>

                        {/* Verified Badge */}
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <CheckCircle className="w-5 h-5" />
                          <span className="font-semibold">Verified Customer</span>
                        </div>
                      </motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Arrows */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none px-4 lg:-mx-16">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={prevSlide}
              className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 group shadow-lg"
            >
              <ChevronLeft className="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:text-blue-300" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={nextSlide}
              className="pointer-events-auto w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center hover:bg-white/30 transition-all duration-300 group shadow-lg"
            >
              <ChevronRight className="w-6 h-6 lg:w-7 lg:h-7 text-white group-hover:text-blue-300" />
            </motion.button>
          </div>
        </div>

        {/* Pagination Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === index
                  ? 'w-12 h-3 bg-linear-to-r from-blue-500 to-purple-500'
                  : 'w-3 h-3 bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-slate-300 mb-4">Join thousands of satisfied customers</p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-linear-to-r from-blue-500 via-purple-500 to-pink-500 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-3"
          >
            <span>Share Your Experience</span>
            <Star className="w-5 h-5 fill-white" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default CustomerFeedback;