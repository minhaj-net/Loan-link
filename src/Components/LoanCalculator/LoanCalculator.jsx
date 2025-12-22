import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Calculator,
  DollarSign,
  Calendar,
  TrendingUp,
  PieChart,
  Download,
  Share2,
  Info,
  ChevronDown,
  HelpCircle,
  CheckCircle2,
  AlertCircle,
  Phone,
  Mail,
  MessageCircle
} from 'lucide-react';

const LoanCalculatorAndFAQ = () => {
  // Loan Calculator State
  const [loanAmount, setLoanAmount] = useState(50000);
  const [interestRate, setInterestRate] = useState(8);
  const [loanTenure, setLoanTenure] = useState(5);
  const [showResult, setShowResult] = useState(false);

  // FAQ State
  const [openFAQ, setOpenFAQ] = useState(null);

  // Calculate EMI
  const calculateEMI = () => {
    const principal = parseFloat(loanAmount);
    const rate = parseFloat(interestRate) / 12 / 100;
    const time = parseFloat(loanTenure) * 12;
    
    const emi = (principal * rate * Math.pow(1 + rate, time)) / (Math.pow(1 + rate, time) - 1);
    const totalAmount = emi * time;
    const totalInterest = totalAmount - principal;
    
    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
      principal: Math.round(principal)
    };
  };

  const result = calculateEMI();

  const faqs = [
    {
      id: 1,
      question: "What documents do I need to apply for a loan?",
      answer: "You'll need a valid ID proof (Passport/Driver's License), proof of income (salary slips/bank statements for last 3 months), address proof (utility bill/rental agreement), and recent passport-sized photographs. Self-employed individuals may need additional business documents.",
      icon: AlertCircle,
      category: "Application"
    },
    {
      id: 2,
      question: "How long does the loan approval process take?",
      answer: "Our AI-powered system can approve most loans within 24-48 hours. Once approved, funds are typically disbursed within 1-2 business days. Complex cases may take 3-5 business days for thorough verification.",
      icon: Calendar,
      category: "Processing"
    },
    {
      id: 3,
      question: "Can I prepay my loan without penalties?",
      answer: "Yes! We offer flexible prepayment options with zero penalties after the first 6 months. You can make partial prepayments or full closure at any time. This helps you save significantly on interest costs.",
      icon: DollarSign,
      category: "Repayment"
    },
    {
      id: 4,
      question: "What is the minimum credit score required?",
      answer: "While we prefer a credit score of 650 or above, we evaluate applications holistically. Even if your score is lower, factors like stable income, existing relationships, and repayment capacity are considered. We believe everyone deserves a fair chance.",
      icon: TrendingUp,
      category: "Eligibility"
    },
    {
      id: 5,
      question: "Are there any hidden charges or fees?",
      answer: "Absolutely not! We believe in complete transparency. All charges including processing fees, GST, and any other applicable charges are clearly mentioned upfront. What you see is what you pay - no surprises, no hidden costs.",
      icon: CheckCircle2,
      category: "Charges"
    },
    {
      id: 6,
      question: "Can I apply for multiple loans simultaneously?",
      answer: "Yes, you can apply for different loan products based on your eligibility. However, we recommend discussing with our loan advisors to optimize your borrowing strategy and ensure it aligns with your financial goals and repayment capacity.",
      icon: HelpCircle,
      category: "General"
    }
  ];

  const handleCalculate = () => {
    setShowResult(true);
  };

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <>
      {/* Loan Calculator Section */}
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
              className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm"
            >
              <Calculator className="w-4 h-4" />
              <span>EMI Calculator</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Calculate Your <span className="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">Monthly EMI</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Plan your finances better with our instant EMI calculator
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-7xl mx-auto">
            {/* Calculator Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-3xl shadow-2xl p-8 lg:p-10"
            >
              <h3 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Calculator className="w-6 h-6 text-blue-600" />
                Loan Details
              </h3>

              {/* Loan Amount */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <label className="text-slate-700 font-semibold flex items-center gap-2">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Loan Amount
                  </label>
                  <span className="text-2xl font-bold text-blue-600">${loanAmount.toLocaleString()}</span>
                </div>
                <input
                  type="range"
                  min="10000"
                  max="1000000"
                  step="5000"
                  value={loanAmount}
                  onChange={(e) => setLoanAmount(e.target.value)}
                  className="w-full h-3 bg-linear-to-r from-blue-200 to-purple-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-linear(to right, #3b82f6 0%, #8b5cf6 ${(loanAmount - 10000) / 9900}%, #e0e7ff ${(loanAmount - 10000) / 9900}%, #e0e7ff 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>$10K</span>
                  <span>$1M</span>
                </div>
              </div>

              {/* Interest Rate */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <label className="text-slate-700 font-semibold flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-purple-600" />
                    Interest Rate
                  </label>
                  <span className="text-2xl font-bold text-purple-600">{interestRate}%</span>
                </div>
                <input
                  type="range"
                  min="5"
                  max="20"
                  step="0.5"
                  value={interestRate}
                  onChange={(e) => setInterestRate(e.target.value)}
                  className="w-full h-3 bg-linear-to-r from-purple-200 to-pink-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-linear(to right, #8b5cf6 0%, #ec4899 ${(interestRate - 5) / 15 * 100}%, #f3e8ff ${(interestRate - 5) / 15 * 100}%, #f3e8ff 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>5%</span>
                  <span>20%</span>
                </div>
              </div>

              {/* Loan Tenure */}
              <div className="mb-8">
                <div className="flex justify-between mb-3">
                  <label className="text-slate-700 font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    Loan Tenure
                  </label>
                  <span className="text-2xl font-bold text-green-600">{loanTenure} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="30"
                  step="1"
                  value={loanTenure}
                  onChange={(e) => setLoanTenure(e.target.value)}
                  className="w-full h-3 bg-linear-to-r from-green-200 to-emerald-200 rounded-lg appearance-none cursor-pointer slider"
                  style={{
                    background: `linear-linear(to right, #10b981 0%, #059669 ${(loanTenure - 1) / 29 * 100}%, #d1fae5 ${(loanTenure - 1) / 29 * 100}%, #d1fae5 100%)`
                  }}
                />
                <div className="flex justify-between text-xs text-slate-500 mt-2">
                  <span>1 Year</span>
                  <span>30 Years</span>
                </div>
              </div>

              {/* Calculate Button */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleCalculate}
                className="w-full bg-linear-to-r from-blue-600 via-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Calculator className="w-5 h-5" />
                Calculate EMI
              </motion.button>
            </motion.div>

            {/* Results */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <AnimatePresence mode="wait">
                {showResult ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                  >
                    {/* EMI Card */}
                    <div className="bg-linear-to-br from-blue-600 via-purple-600 to-pink-600 rounded-3xl shadow-2xl p-8 lg:p-10 text-white mb-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold opacity-90">Monthly EMI</h3>
                        <PieChart className="w-6 h-6 opacity-75" />
                      </div>
                      <motion.p
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        className="text-5xl lg:text-6xl font-bold mb-2"
                      >
                        ${result.emi.toLocaleString()}
                      </motion.p>
                      <p className="text-blue-100">per month for {loanTenure} years</p>
                    </div>

                    {/* Breakdown Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                          <p className="text-slate-600 text-sm font-medium">Principal Amount</p>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">${result.principal.toLocaleString()}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                          <p className="text-slate-600 text-sm font-medium">Total Interest</p>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">${result.totalInterest.toLocaleString()}</p>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="bg-white rounded-2xl shadow-lg p-6"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 rounded-full bg-green-500"></div>
                          <p className="text-slate-600 text-sm font-medium">Total Amount</p>
                        </div>
                        <p className="text-2xl font-bold text-slate-800">${result.totalAmount.toLocaleString()}</p>
                      </motion.div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-4 mt-6">
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white text-blue-600 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Download className="w-5 h-5" />
                        <span>Download</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-white text-purple-600 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
                      >
                        <Share2 className="w-5 h-5" />
                        <span>Share</span>
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="bg-linear-to-br from-slate-100 to-slate-200 rounded-3xl shadow-xl p-12 text-center h-full flex flex-col items-center justify-center"
                  >
                    <Calculator className="w-20 h-20 text-slate-400 mb-4" />
                    <h3 className="text-2xl font-bold text-slate-700 mb-2">Calculate Your EMI</h3>
                    <p className="text-slate-600">Adjust the loan details and click calculate to see your monthly payment breakdown</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Info Box */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
                className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6"
              >
                <div className="flex items-start gap-3">
                  <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-bold text-slate-800 mb-1">Important Note</h4>
                    <p className="text-slate-600 text-sm">
                      This is an approximate calculation. Actual EMI may vary based on processing fees, GST, and other charges. Contact our loan advisor for exact figures.
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 lg:py-24 bg-linear-to-br from-blue-900 via-blue-900 to-blue-900 relative overflow-hidden">
         {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[linear-linear(rgba(255,255,255,.02)_1px,transparent_1px),linear-linear(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:64px_64px]"></div>
      </div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* section likes  Header */}
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
              className="inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Got Questions?</span>
            </motion.div>
            
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-800 mb-4">
              Frequently Asked <span className="bg-linear-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Questions</span>
            </h2>
            <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
              Find answers to common questions about our loan services
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {/* FAQ Items */}
            <div className="space-y-4">
              {faqs.map((faq, index) => {
                const IconComponent = faq.icon;
                const isOpen = openFAQ === faq.id;

                return (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    <button
                      onClick={() => toggleFAQ(faq.id)}
                      className="w-full px-6 lg:px-8 py-6 flex items-start gap-4 text-left hover:bg-slate-50 transition-colors duration-300"
                    >
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                        isOpen ? 'bg-linear-to-br from-purple-500 to-pink-500' : 'bg-slate-100'
                      } transition-all duration-300`}>
                        <IconComponent className={`w-6 h-6 ${isOpen ? 'text-white' : 'text-slate-600'}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 text-xs font-semibold rounded-full mb-2">
                              {faq.category}
                            </span>
                            <h3 className="text-lg lg:text-xl font-bold text-slate-800">
                              {faq.question}
                            </h3>
                          </div>
                          <motion.div
                            animate={{ rotate: isOpen ? 180 : 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex-shrink-0"
                          >
                            <ChevronDown className="w-6 h-6 text-slate-400" />
                          </motion.div>
                        </div>
                      </div>
                    </button>

                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="px-6 lg:px-8 pb-6 pl-20 lg:pl-24">
                            <p className="text-slate-600 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>

            {/* Contact Support Card */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="mt-12 bg-linear-to-r from-purple-600 via-pink-600 to-red-600 rounded-3xl shadow-2xl p-8 lg:p-10 text-white"
            >
              <div className="text-center mb-8">
                <h3 className="text-2xl lg:text-3xl font-bold mb-2">Still Have Questions?</h3>
                <p className="text-purple-100">Our support team is here to help you 24/7</p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <motion.a
                  href="tel:1800123456"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Phone className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold mb-1">Call Us</h4>
                  <p className="text-sm text-purple-100">1800-123-456</p>
                </motion.a>

                <motion.a
                  href="mailto:support@loanapp.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Mail className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold mb-1">Email Us</h4>
                  <p className="text-sm text-purple-100">support@loanapp.com</p>
                </motion.a>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-300 border border-white/20"
                >
                  <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="w-7 h-7" />
                  </div>
                  <h4 className="font-bold mb-1">Live Chat</h4>
                  <p className="text-sm text-purple-100">Start chatting now</p>
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default LoanCalculatorAndFAQ;