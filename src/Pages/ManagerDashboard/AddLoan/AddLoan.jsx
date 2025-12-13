import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";

const AddLoan = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);

  // Image Upload Function
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);
    // REPLACE WITH YOUR IMGBB API KEY
    const apiKey = "7c23d8e112ad445dd6631754338aeea4";
    // Ideally, this should be in an environment variable like import.meta.env.VITE_IMGBB_KEY
    // Amar Sonar bangla ami tomai valobashi ..
    // Ami ki tomar hasi mukher abar karon hobo , ami ki Tomar Hasi Mukher abar baron  hobo?
    // Ami Ki tomar Kinmu ..Amar abaro dekha hbe ..ki j korbo kissui bujhtesi nha ,,ami amar
    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        formData
      );
      return response.data.data.url;
    } catch (error) {
      console.error("Image upload failed:", error);
      throw new Error("Image upload failed");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      // 1. Upload Image if exists
      let loanImage = "";
      if (data.image && data.image[0]) {
        // If using a real key, this would work.
        // For now, if no key, we might wrap this in try/catch or assume success if needed for demo?
        // But request says "imgbb for photo upload".
        loanImage = await uploadImage(data.image[0]);
      }

      // 2. Prepare Payload
      const loanData = {
        loanTitle: data.loanTitle,
        description: data.description,
        category: data.category,
        interestRate: parseFloat(data.interestRate),
        maxLimit: parseFloat(data.maxLimit),
        documents: data.documents, // Array of checkbox values
        availableEMIPlans: data.availableEMIPlans,
        loanImage: loanImage,
        showOnHome: data.showOnHome,
        // Date is added by backend, but we can display it or send it too if we want to be explicit.
        // Request said "Date Auto-generated from system date Read-only" - user sees it.
        // Backend adds it too.
      };

      // 3. Send to Backend
      const response = await axios.post(
        "http://localhost:3000/all-loans",
        loanData
      );

      if (response.data.insertedId) {
        Swal.fire({
          title: "Success!",
          text: "Loan added successfully",
          icon: "success",
          confirmButtonText: "Ok",
        });
        reset();
      }
    } catch (error) {
      console.error("Error adding loan:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add loan. Check console or API key.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    "Personal Loan",
    "Education Loan",
    "Business Loan",
    "Medical Loan",
    "Agriculture Loan",
  ];
  const documentsList = [
    "NID",
    "Bank Statement",
    "Salary Slip",
    "Guarantor Info",
  ];
  const emiOptions = ["6 months", "12 months", "24 months"];
  const currentDate = new Date().toDateString();

  return (
    <div className="w-full max-w-4xl mx-auto p-5 bg-base-100 shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Add New Loan
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Loan Title */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Loan Title <span className="text-red-500">*</span>
            </span>
          </label>
          <input
            type="text"
            placeholder="e.g. Home Renovation Loan"
            className="input input-bordered w-full"
            {...register("loanTitle", { required: "Loan Title is required" })}
          />
          {errors.loanTitle && (
            <p className="text-red-500 text-sm mt-1">{errors.loanTitle.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              Description <span className="text-red-500">*</span>
            </span>
          </label>
          <textarea
            className="textarea textarea-bordered h-24"
            placeholder="Loan purpose and terms..."
            {...register("description", {
              required: "Description is required",
            })}
          ></textarea>
          {errors.description && (
            <p className="text-red-500 text-sm mt-1">
              {errors.description.message}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Category */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Category <span className="text-red-500">*</span>
              </span>
            </label>
            <select
              className="select select-bordered w-full"
              {...register("category", { required: "Category is required" })}
            >
              <option value="">Select Category</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          {/* Interest Rate */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Interest Rate (%) <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              step="0.1"
              placeholder="e.g. 5.5"
              className="input input-bordered w-full"
              {...register("interestRate", {
                required: "Interest Rate is required",
                min: { value: 0.1, message: "Must be greater than 0" },
              })}
            />
            {errors.interestRate && (
              <p className="text-red-500 text-sm mt-1">
                {errors.interestRate.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Max Loan Limit */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">
                Max Loan Limit <span className="text-red-500">*</span>
              </span>
            </label>
            <input
              type="number"
              placeholder="e.g. 100000"
              className="input input-bordered w-full"
              {...register("maxLimit", {
                required: "Max Loan Limit is required",
              })}
            />
            {errors.maxLimit && (
              <p className="text-red-500 text-sm mt-1">
                {errors.maxLimit.message}
              </p>
            )}
          </div>

          {/* Date (Read Only) */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-semibold">Date</span>
            </label>
            <input
              type="text"
              value={currentDate}
              readOnly
              className="input input-bordered w-full bg-base-200"
            />
          </div>
        </div>

        {/* EMI Plans */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">
              EMI Plans <span className="text-red-500">*</span>
            </span>
          </label>
          <select
            multiple
            className="select select-bordered w-full"
            {...register("availableEMIPlans", {
              required: "Please select at least one EMI plan",
            })}
          >
            {emiOptions.map((opt, idx) => (
              <option key={idx} value={opt}>
                {opt}
              </option>
            ))}
          </select>
          {errors.availableEMIPlans && (
            <p className="text-red-500 text-sm mt-1">
              {errors.availableEMIPlans.message}
            </p>
          )}
        </div>

        {/* Required Documents */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Required Documents</span>
          </label>
          <div className="flex flex-wrap gap-4">
            {documentsList.map((doc, idx) => (
              <label
                key={idx}
                className="label cursor-pointer gap-2 border p-2 rounded-lg hover:bg-base-200"
              >
                <span className="label-text">{doc}</span>
                <input
                  type="checkbox"
                  value={doc}
                  className="checkbox checkbox-primary"
                  {...register("documents")}
                />
              </label>
            ))}
          </div>
        </div>

        {/* Image Upload */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Loan Image</span>
          </label>
          <input
            type="file"
            className="file-input file-input-bordered w-full"
            accept="image/png, image/jpeg, image/webp"
            {...register("image")}
          />
        </div>

        {/* Show on Home */}
        <div className="form-control w-52">
          <label className="label cursor-pointer">
            <span className="label-text font-semibold">Show on Home</span>
            <input
              type="checkbox"
              className="toggle toggle-primary"
              {...register("showOnHome")}
            />
          </label>
        </div>

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className={`btn btn-primary w-full ${loading ? "loading" : ""}`}
            disabled={loading}
          >
            {loading ? "Submitting..." : "Add Loan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddLoan;
