import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { Save, X, Upload, DollarSign, CreditCard } from "lucide-react";
import { useParams } from "react-router";
import axios from "axios";
import toast from "react-hot-toast";

const UpdateLoand = () => {
  const { id } = useParams();
  console.log(id);
  const [loan, setLoan] = useState();

  useEffect(() => {
    const fetchLoan = async () => {
      try {
        const res = await axios.get(`https://loan-link-server-sable.vercel.app/all-loans/${id}`);
        setLoan(res.data);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchLoan();
  }, [id]);

  console.log(loan);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  useEffect(() => {
    // Initialize AOS
    if (typeof window !== "undefined") {
      import("aos").then((AOS) => {
        AOS.init({
          duration: 800,
          once: true,
        });
      });
    }
  }, []);

  const onSubmit = (data) => {
    console.log("Form Data:", data);
    axios
      .put(`https://loan-link-server-sable.vercel.app/all-loans/${id}`, data)
      .then(() => {
        toast.success("✅ Loan updated successfully!");
      })
      .catch(() => {
        toast.error("❌ Update failed! Try again.");
      });
  };

  const handleReset = () => {
    reset();
  };

  const imageFile = watch("images");

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-purple-50 to-pink-50 p-4 md:p-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            Update Loan
          </h1>
          <p className="text-gray-600">Modify loan details and settings</p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-2xl p-6 md:p-10"
          data-aos="fade-up"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <div
              className="form-control"
              data-aos="fade-right"
              data-aos-delay="100"
            >
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Title <span className="text-red-500">*</span>
                </span>
              </label>
              <input
                type="text"
                placeholder="Enter loan title"
                defaultValue={loan?.loanTitle}
                className={`input input-bordered w-full ${
                  errors.title ? "input-error" : "focus:input-primary"
                }`}
                {...register("loanTitle", {
                  required: "Title is required",
                  minLength: {
                    value: 3,
                    message: "Title must be at least 3 characters",
                  },
                })}
              />
              {errors.title && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.title.message}
                  </span>
                </label>
              )}
            </div>

            {/* Description */}
            <div
              className="form-control"
              data-aos="fade-right"
              data-aos-delay="150"
            >
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Description <span className="text-red-500">*</span>
                </span>
              </label>
              <textarea
                placeholder="Enter loan description"
                defaultValue={loan?.description}
                className={`textarea textarea-bordered h-24 w-full ${
                  errors.description
                    ? "textarea-error"
                    : "focus:textarea-primary"
                }`}
                {...register("description", {
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                })}
              />
              {errors.description && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.description.message}
                  </span>
                </label>
              )}
            </div>

            {/* Interest & Category Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Interest */}
              <div
                className="form-control"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <label className="label">
                  <span className="label-text text-lg font-semibold text-gray-700">
                    Interest (%) <span className="text-red-500">*</span>
                  </span>
                </label>
                <label className="input-group">
                  <input
                    type="number"
                    step="0.01"
                    placeholder="12.5"
                    defaultValue={loan?.interestRate}
                    className={`input input-bordered w-full ${
                      errors.interest ? "input-error" : "focus:input-primary"
                    }`}
                    {...register("interestRate", {
                      required: "Interest rate is required",
                      min: { value: 0, message: "Interest must be positive" },
                    })}
                  />
                  <span className="bg-primary text-white">%</span>
                </label>
                {errors.interest && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.interest.message}
                    </span>
                  </label>
                )}
              </div>

              {/* Category */}
              <div
                className="form-control"
                data-aos="fade-left"
                data-aos-delay="200"
              >
                <label className="label">
                  <span className="label-text text-lg font-semibold text-gray-700">
                    Category <span className="text-red-500">*</span>
                  </span>
                </label>
                <select
                  defaultValue={loan?.category}
                  className={`select select-bordered w-full ${
                    errors.category ? "select-error" : "focus:select-primary"
                  }`}
                  {...register("category", {
                    required: "Category is required",
                  })}
                >
                  <option value="">Select category</option>
                  <option value="Personal">Personal</option>
                  <option value="Home">Home</option>
                  <option value="Car">Car</option>
                  <option value="Education">Education</option>
                  <option value="Business">Business</option>
                </select>
                {errors.category && (
                  <label className="label">
                    <span className="label-text-alt text-error">
                      {errors.category.message}
                    </span>
                  </label>
                )}
              </div>
            </div>

            {/* Images Upload */}
            <div
              className="form-control"
              data-aos="fade-right"
              data-aos-delay="250"
            >
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Images <span className="text-red-500">*</span>
                </span>
              </label>
              <label className="cursor-pointer">
                <div
                  className={`border-2 border-dashed rounded-xl p-8 text-center hover:border-primary transition-colors ${
                    errors.images ? "border-error" : "border-gray-300"
                  }`}
                >
                  <Upload className="mx-auto mb-2 text-gray-400" size={40} />
                  <p className="text-gray-600 mb-2">Click to upload images</p>
                  <p className="text-sm text-gray-400">PNG, JPG up to 5MB</p>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    multiple
                    {...register("images", {
                      required: "Please upload at least one image",
                    })}
                  />
                  {imageFile && imageFile.length > 0 && (
                    <p className="text-sm text-success mt-2">
                      {imageFile.length} file(s) selected
                    </p>
                  )}
                </div>
              </label>
              {errors.images && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.images.message}
                  </span>
                </label>
              )}
            </div>

            {/* Max Loan Limit */}
            <div
              className="form-control"
              data-aos="fade-right"
              data-aos-delay="300"
            >
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Max Loan Limit <span className="text-red-500">*</span>
                </span>
              </label>
              <label className="input-group">
                <span className="bg-success text-white">
                  <DollarSign size={20} />
                </span>
                <input
                  defaultValue={loan?.maxLimit}
                  type="number"
                  placeholder="500000"
                  className={`input input-bordered w-full ${
                    errors.maxLoanLimit ? "input-error" : "focus:input-primary"
                  }`}
                  {...register("maxLimit", {
                    required: "Max loan limit is required",
                    min: { value: 1000, message: "Minimum loan limit is 1000" },
                  })}
                />
              </label>
              {errors.maxLoanLimit && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.maxLoanLimit.message}
                  </span>
                </label>
              )}
            </div>

            {/* Available EMI Plan */}
            <div
              className="form-control"
              data-aos="fade-right"
              data-aos-delay="350"
            >
              <label className="label">
                <span className="label-text text-lg font-semibold text-gray-700">
                  Available EMI Plan (Months){" "}
                  <span className="text-red-500">*</span>
                </span>
              </label>
              <label className="input-group">
                <span className="bg-info text-white">
                  <CreditCard size={20} />
                </span>
                <input
                  defaultValue={loan?.availableEMIPlan}
                  type="text"
                  placeholder="12,24,36,48"
                  className={`input input-bordered w-full ${
                    errors.availableEMIPlan
                      ? "input-error"
                      : "focus:input-primary"
                  }`}
                  {...register("availableEMIPlan", {
                    required: "EMI plan is required",
                    pattern: {
                      value: /^(\d+)(,\d+)*$/,
                      message: "Enter comma-separated numbers (e.g., 12,24,36)",
                    },
                  })}
                />
              </label>
              {errors.availableEMIPlan && (
                <label className="label">
                  <span className="label-text-alt text-error">
                    {errors.availableEMIPlan.message}
                  </span>
                </label>
              )}
              <label className="label">
                <span className="label-text-alt text-gray-500">
                  Enter comma-separated values (e.g., 12,24,36,48)
                </span>
              </label>
            </div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 pt-6"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="btn btn-primary btn-lg flex-1 text-white"
              >
                <Save className="mr-2" size={20} />
                Update Loan
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                onClick={handleReset}
                className="btn btn-outline btn-lg flex-1"
              >
                <X className="mr-2" size={20} />
                Reset
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default UpdateLoand;
