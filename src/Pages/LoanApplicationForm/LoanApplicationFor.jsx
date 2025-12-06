import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { 
  User,
  Mail,
  Phone,
  CreditCard,
  Briefcase,
  DollarSign,
  FileText,
  MapPin,
  CheckCircle,
  Lock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

const LoanApplicationForm = () => {
  // Auto-filled data (read-only) - would come from props or API
  const autoFilledData = {
    userEmail: 'john.doe@example.com',
    loanTitle: 'Home Loan',
    interestRate: '8.5%'
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const incomeSourceOptions = [
    'Salaried Employee',
    'Self-Employed',
    'Business Owner',
    'Freelancer',
    'Rental Income',
    'Pension',
    'Other'
  ];

  const onSubmit = async (data) => {
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      const applicationData = {
        ...autoFilledData,
        ...data,
        status: 'Pending',
        submittedAt: new Date().toISOString()
      };
      
      console.log('Application submitted:', applicationData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form and success message after 3 seconds
      setTimeout(() => {
        setSubmitSuccess(false);
        reset();
      }, 3000);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex mt-16 items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm">
            <FileText className="w-4 h-4" />
            <span>Loan Application</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-2">
            Apply for Your Loan
          </h1>
          <p className="text-slate-600">Fill in the details below to proceed with your application</p>
        </motion.div>

        {/* Success Message */}
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 bg-green-50 border-2 border-green-500 rounded-2xl p-6 flex items-center gap-4"
          >
            <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
              <CheckCircle className="w-7 h-7 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-green-800 text-lg">Application Submitted!</h3>
              <p className="text-green-700">Your loan application has been successfully submitted. We'll review it shortly.</p>
            </div>
          </motion.div>
        )}

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden"
        >
          {/* Auto-filled Section */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 border-b border-slate-200">
            <div className="flex items-center gap-2 mb-4">
              <Lock className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-bold text-slate-800">Auto-filled Information</h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="w-4 h-4 text-slate-600" />
                  <p className="text-xs font-semibold text-slate-600">User Email</p>
                </div>
                <p className="font-semibold text-slate-800 truncate">{autoFilledData.userEmail}</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-slate-600" />
                  <p className="text-xs font-semibold text-slate-600">Loan Title</p>
                </div>
                <p className="font-semibold text-slate-800">{autoFilledData.loanTitle}</p>
              </div>
              <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-4 h-4 text-slate-600" />
                  <p className="text-xs font-semibold text-slate-600">Interest Rate</p>
                </div>
                <p className="font-semibold text-slate-800">{autoFilledData.interestRate}</p>
              </div>
            </div>
          </div>

          {/* Form Section */}
          <div className="p-6 sm:p-8">
            <div className="space-y-6">
              {/* Personal Information */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  Personal Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* First Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('firstName', { 
                        required: 'First name is required',
                        minLength: { value: 2, message: 'Minimum 2 characters' }
                      })}
                      className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.firstName ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-blue-500'
                      }`}
                      placeholder="John"
                    />
                    {errors.firstName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.firstName.message}
                      </p>
                    )}
                  </div>

                  {/* Last Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('lastName', { 
                        required: 'Last name is required',
                        minLength: { value: 2, message: 'Minimum 2 characters' }
                      })}
                      className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.lastName ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-blue-500'
                      }`}
                      placeholder="Doe"
                    />
                    {errors.lastName && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.lastName.message}
                      </p>
                    )}
                  </div>

                  {/* Contact Number */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Contact Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="tel"
                        {...register('contactNumber', { 
                          required: 'Contact number is required',
                          pattern: { 
                            value: /^[0-9+\s()-]{10,}$/, 
                            message: 'Invalid phone number' 
                          }
                        })}
                        className={`w-full pl-12 pr-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.contactNumber ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-blue-500'
                        }`}
                        placeholder="+1 (555) 123-4567"
                      />
                    </div>
                    {errors.contactNumber && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.contactNumber.message}
                      </p>
                    )}
                  </div>

                  {/* National ID / Passport Number */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      National ID / Passport Number <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <CreditCard className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="text"
                        {...register('nationalId', { 
                          required: 'ID/Passport number is required',
                          minLength: { value: 5, message: 'Invalid ID number' }
                        })}
                        className={`w-full pl-12 pr-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.nationalId ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-blue-500'
                        }`}
                        placeholder="A12345678"
                      />
                    </div>
                    {errors.nationalId && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.nationalId.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Financial Information */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Briefcase className="w-5 h-5 text-green-600" />
                  Financial Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {/* Income Source */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Income Source <span className="text-red-500">*</span>
                    </label>
                    <select
                      {...register('incomeSource', { required: 'Income source is required' })}
                      className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.incomeSource ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-blue-500'
                      }`}
                    >
                      <option value="">Select income source</option>
                      {incomeSourceOptions.map((option) => (
                        <option key={option} value={option}>{option}</option>
                      ))}
                    </select>
                    {errors.incomeSource && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.incomeSource.message}
                      </p>
                    )}
                  </div>

                  {/* Monthly Income */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Monthly Income <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="number"
                        {...register('monthlyIncome', { 
                          required: 'Monthly income is required',
                          min: { value: 1, message: 'Invalid income amount' }
                        })}
                        className={`w-full pl-12 pr-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.monthlyIncome ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-blue-500'
                        }`}
                        placeholder="5000"
                      />
                    </div>
                    {errors.monthlyIncome && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.monthlyIncome.message}
                      </p>
                    )}
                  </div>

                  {/* Loan Amount */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Loan Amount <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input
                        type="number"
                        {...register('loanAmount', { 
                          required: 'Loan amount is required',
                          min: { value: 1000, message: 'Minimum loan amount is $1000' }
                        })}
                        className={`w-full pl-12 pr-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none transition-colors ${
                          errors.loanAmount ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-blue-500'
                        }`}
                        placeholder="50000"
                      />
                    </div>
                    {errors.loanAmount && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.loanAmount.message}
                      </p>
                    )}
                  </div>

                  {/* Reason for Loan */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                      Reason for Loan <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      {...register('reasonForLoan', { 
                        required: 'Reason is required',
                        minLength: { value: 10, message: 'Please provide more details (min 10 characters)' }
                      })}
                      className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none transition-colors ${
                        errors.reasonForLoan ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-blue-500'
                      }`}
                      placeholder="Home purchase, renovation, etc."
                    />
                    {errors.reasonForLoan && (
                      <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {errors.reasonForLoan.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-purple-600" />
                  Additional Information
                </h3>
                
                {/* Address */}
                <div className="mb-4">
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Address <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...register('address', { 
                      required: 'Address is required',
                      minLength: { value: 10, message: 'Please provide complete address' }
                    })}
                    rows="3"
                    className={`w-full px-4 py-3 bg-slate-50 border-2 rounded-xl focus:outline-none transition-colors resize-none ${
                      errors.address ? 'border-red-500 focus:border-red-600' : 'border-slate-200 focus:border-blue-500'
                    }`}
                    placeholder="Enter your complete address"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-4 h-4" />
                      {errors.address.message}
                    </p>
                  )}
                </div>

                {/* Extra Notes */}
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-2">
                    Extra Notes
                  </label>
                  <textarea
                    {...register('extraNotes')}
                    rows="4"
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
                    placeholder="Any additional information you'd like to share..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  onClick={handleSubmit(onSubmit)}
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <span>Submit Application</span>
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </button>
                <p className="text-center text-sm text-slate-500 mt-3">
                  By submitting, you agree to our terms and conditions
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LoanApplicationForm;