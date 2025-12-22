import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  DollarSign,
  TrendingUp,
  Calendar,
  CheckCircle,
  FileText,
  Shield,
  Clock,
  Calculator,
  Download,
  Share2,
  AlertCircle,
  Phone,
  Mail,
  CreditCard,
} from "lucide-react";
import { Link, useNavigate, useParams } from "react-router";
import DashboardOverview from "../Dashboard/DashboardOverView/DashboardOverView";

const LoanDetails = () => {
  const [loanData, setLoanData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedEMI, setSelectedEMI] = useState(null);
  const [loanAmount, setLoanAmount] = useState(0);
  const [calculatedEMI, setCalculatedEMI] = useState(null);
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(-1); // Goes one step back
  };
  const { id } = useParams();
  console.log("Received ID:", id);
  useEffect(() => {
    fetchLoanDetails();
  }, []);

  const fetchLoanDetails = async () => {
    try {
      // Replace with your actual API call
      const response = await fetch(`https://loan-link-server-sable.vercel.app/all-loans/${id}`);
      const sampleData = await response.json();
      console.log(sampleData);
      // Sample data for demonstration
      // const sampdleData = {
      //   loanImage:
      //     "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80",
      //   loanTitle: "Home Loan",
      //   description:
      //     "Turn your dream home into reality with our flexible home loan options and competitive interest rates. Get up to 90% financing with minimal documentation.",
      //   category: "Home",
      //   interestRate: "8.5%",
      //   maxLimit: 500000,
      //   availableEMIPlans: [
      //     "12 Months",
      //     "24 Months",
      //     "36 Months",
      //     "60 Months",
      //     "120 Months",
      //   ],
      //   features: [
      //     "No prepayment charges after 6 months",
      //     "Minimal documentation required",
      //     "Quick approval within 48 hours",
      //     "Flexible repayment options",
      //     "Online application process",
      //   ],
      //   eligibility: [
      //     "Age: 21 to 65 years",
      //     "Minimum income: $30,000 per year",
      //     "Employment: Salaried or Self-employed",
      //     "Credit Score: 650 or above",
      //     "Valid identification and address proof",
      //   ],
      //   documents: [
      //     "Government-issued photo ID",
      //     "Proof of income (last 3 months)",
      //     "Bank statements (last 6 months)",
      //     "Address proof",
      //     "Property documents (if applicable)",
      //   ],
      // };

      setLoanData(sampleData);
      setLoanAmount(sampleData.maxLimit * 0.5);
      if (sampleData.availableEMIPlans && sampleData.availableEMIPlans.length > 0) {
        setSelectedEMI(sampleData.availableEMIPlans[0]);
      }
    } catch (error) {
      console.error("Error fetching loan details:", error);
    } finally {
      setLoading(false);
    }
  };

  const calculateEMI = () => {
    if (!loanAmount || !selectedEMI) return null;

    const principal = parseFloat(loanAmount);
    const rate = parseFloat(loanData.interestRate) / 12 / 100;
    const months = parseInt(selectedEMI.split(" ")[0]);

    const emi =
      (principal * rate * Math.pow(1 + rate, months)) /
      (Math.pow(1 + rate, months) - 1);
    const totalAmount = emi * months;
    const totalInterest = totalAmount - principal;

    return {
      emi: Math.round(emi),
      totalAmount: Math.round(totalAmount),
      totalInterest: Math.round(totalInterest),
    };
  };

  useEffect(() => {
    if (loanAmount && selectedEMI && loanData) {
      setCalculatedEMI(calculateEMI());
    }
  }, [loanAmount, selectedEMI]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600 font-medium">Loading loan details...</p>
        </div>
      </div>
    );
  }

  if (!loanData) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <p className="text-slate-600 font-medium">Loan not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={handleBack}
              className="flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span className="font-medium">Back to Loans</span>
            </button>
            <div className="flex items-center gap-3">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Share2 className="w-5 h-5 text-slate-600" />
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Download className="w-5 h-5 text-slate-600" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200"
            >
              <div className="relative h-64 sm:h-80 overflow-hidden">
                <img
                  src={loanData.loanImage}
                  alt={loanData.loanTitle}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-semibold rounded-full mb-3">
                    {loanData.category}
                  </span>
                  <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2">
                    {loanData.loanTitle}
                  </h1>
                </div>
              </div>

              <div className="p-6 sm:p-8">
                <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b border-slate-200">
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <TrendingUp className="w-5 h-5 text-blue-600" />
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Interest Rate</p>
                    <p className="text-xl font-bold text-slate-900">
                      {loanData.interestRate}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <DollarSign className="w-5 h-5 text-green-600" />
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Max Limit</p>
                    <p className="text-xl font-bold text-slate-900">
                      ${loanData.maxLimit}
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-2">
                      <Calendar className="w-5 h-5 text-purple-600" />
                    </div>
                    <p className="text-sm text-slate-600 mb-1">Tenure</p>
                    <p className="text-xl font-bold text-slate-900">
                      Up to 10 Yrs
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-3">
                    About This Loan
                  </h2>
                  <p className="text-slate-600 leading-relaxed">
                    {loanData.description}
                  </p>
                </div>

                {/* <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Key Features</h2>
                  <div className="space-y-3">
                    {loanData.features.map((feature, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div> */}

                {/* <div className="mb-6">
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Eligibility Criteria</h2>
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    {loanData.eligibility.map((criteria, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-600 flex-shrink-0 mt-2"></div>
                        <span className="text-slate-700">{criteria}</span>
                      </div>
                    ))}
                  </div>
                </div> */}

                <div>
                  <h2 className="text-xl font-bold text-slate-900 mb-4">Required Documents</h2>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {loanData.documents && loanData.documents.map((doc, index) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                        <FileText className="w-5 h-5 text-slate-600 flex-shrink-0" />
                        <span className="text-slate-700 text-sm">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* EMI Calculator */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <Calculator className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">
                  EMI Calculator
                </h2>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-sm font-semibold text-slate-700">
                      Loan Amount
                    </label>
                    <span className="text-xl font-bold text-blue-600">
                      ${loanAmount}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10000"
                    max={loanData.maxLimit}
                    step="5000"
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #2563eb 0%, #2563eb ${
                        (loanAmount / loanData.maxLimit) * 100
                      }%, #e2e8f0 ${
                        (loanAmount / loanData.maxLimit) * 100
                      }%, #e2e8f0 100%)`,
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-500 mt-2">
                    <span>$10K</span>
                    <span>${loanData.maxLimit}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-3">
                    Select EMI Plan
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {loanData.availableEMIPlans?.map((plan) => (
                      <button
                        key={plan}
                        onClick={() => setSelectedEMI(plan)}
                        className={`p-3 rounded-xl border-2 font-semibold transition-all ${
                          selectedEMI === plan
                            ? "border-blue-600 bg-blue-50 text-blue-600"
                            : "border-slate-200 hover:border-slate-300 text-slate-700"
                        }`}
                      >
                        {plan}
                      </button>
                    ))}
                  </div>
                </div>

                {calculatedEMI && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl p-6 text-white"
                  >
                    <p className="text-sm opacity-90 mb-2">Monthly EMI</p>
                    <p className="text-4xl font-bold mb-4">
                      ${calculatedEMI.emi.toLocaleString()}
                    </p>
                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/20">
                      <div>
                        <p className="text-xs opacity-75 mb-1">
                          Total Interest
                        </p>
                        <p className="text-lg font-semibold">
                          ${calculatedEMI.totalInterest}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs opacity-75 mb-1">Total Amount</p>
                        <p className="text-lg font-semibold">
                          ${calculatedEMI.totalAmount}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 sticky top-24"
            >
              <div className="mb-6">
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-semibold text-green-600">
                    100% Secure
                  </span>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">
                  Ready to Apply?
                </h3>
                <p className="text-slate-600 text-sm">
                  Get approved in as fast as 24 hours
                </p>
              </div>
                  
              <Link
                to={`application-form`}
                className="w-full btn  bg-gradient-to-r from-blue-600 to-blue-700 text-white py-7 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl mb-4"
              >
                Apply Now
              </Link>

              <button className="w-full border-2 border-slate-200 text-slate-700 py-3 rounded-xl font-semibold hover:border-slate-300 hover:bg-slate-50 transition-all">
                Check Eligibility
              </button>

              <div className="mt-6 pt-6 border-t border-slate-200 space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      Quick Approval
                    </p>
                    <p className="text-slate-600 text-xs">
                      Get response within 24-48 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      Minimal Paperwork
                    </p>
                    <p className="text-slate-600 text-xs">
                      Simple documentation process
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CreditCard className="w-5 h-5 text-slate-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">
                      Instant Disbursal
                    </p>
                    <p className="text-slate-600 text-xs">
                      Get funds directly to your account
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
                  <DashboardOverview></DashboardOverview>
            {/* Contact Card */}
            {/* <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white"
            >
              <h3 className="text-lg font-bold mb-4">Need Help?</h3>
              <p className="text-slate-300 text-sm mb-6">Our loan experts are here to assist you</p>
              
              <div className="space-y-3">
                <a href="tel:1800123456" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                  <Phone className="w-5 h-5" />
                  <div>
                    <p className="text-xs text-slate-300">Call Us</p>
                    <p className="font-semibold">1800-123-456</p>
                  </div>
                </a>
                <a href="mailto:loans@bank.com" className="flex items-center gap-3 p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-colors">
                  <Mail className="w-5 h-5" />
                  <div>
                    <p className="text-xs text-slate-300">Email Us</p>
                    <p className="font-semibold">loans@bank.com</p>
                  </div>
                </a>
              </div>
            </motion.div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanDetails;
