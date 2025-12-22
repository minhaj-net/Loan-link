import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import axios from "axios";
import { useParams, useNavigate } from "react-router";

const ManagerManageLoandetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentImage, setCurrentImage] = useState("");

  const apiKey = "7c23d8e112ad445dd6631754338aeea4"; // Using the key found in AddLoan.jsx

  // Fetch Loan Data
  useEffect(() => {
    const fetchLoanData = async () => {
      try {
        const response = await axios.get(`https://loan-link-server-sable.vercel.app/all-loans/${id}`);
        const data = response.data;
        
        // Pre-fill form
        reset({
          loanTitle: data.loanTitle,
          description: data.description,
          category: data.category,
          interestRate: data.interestRate,
          maxLimit: data.maxLimit,
          documents: data.documents || [],
          availableEMIPlans: data.availableEMIPlans || [],
          showOnHome: data.showOnHome,
        });
        setCurrentImage(data.loanImage);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching loan:", error);
        Swal.fire("Error", "Failed to load loan data", "error");
        setLoading(false);
      }
    };
    fetchLoanData();
  }, [id, reset]);

  // Image Upload Function
  const uploadImage = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

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
    setSubmitting(true);
    try {
      // 1. Upload new image if selected
      let loanImage = currentImage;
      if (data.image && data.image[0]) {
        loanImage = await uploadImage(data.image[0]);
      }

      // 2. Prepare Update Payload
      const updatedData = {
        loanTitle: data.loanTitle,
        description: data.description,
        category: data.category,
        interestRate: parseFloat(data.interestRate),
        maxLimit: parseFloat(data.maxLimit),
        documents: data.documents,
        availableEMIPlans: data.availableEMIPlans,
        loanImage: loanImage,
        showOnHome: data.showOnHome,
      };

      // 3. Send Update Request
      const response = await axios.put(
        `https://loan-link-server-sable.vercel.app/all-loans/${id}`,
        updatedData
      );

      if (response.data.modifiedCount > 0 || response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Loan updated successfully",
          icon: "success",
          confirmButtonText: "Ok",
        }).then(() => {
             // Optional: Redirect back to manage loans
             // navigate('/dashboard/manage-loans');
        });
        setCurrentImage(loanImage); // Update preview
      } else {
        Swal.fire("Info", "No changes made to the loan", "info");
      }
    } catch (error) {
      console.error("Error updating loan:", error);
      Swal.fire("Error", "Failed to update loan", "error");
    } finally {
      setSubmitting(false);
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

  if (loading) {
    return (
        <div className="flex justify-center items-center h-screen">
             <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    )
  }

  return (
    <div className="w-full max-w-4xl mx-auto p-5 bg-base-100 shadow-xl rounded-xl">
      <h2 className="text-3xl font-bold text-center mb-8 text-primary">
        Update Loan Details
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
            className="select select-bordered w-full h-32"
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
          <label className="label">
            <span className="label-text-alt text-gray-500">Hold Ctrl (Windows) or Cmd (Mac) to select multiple</span>
          </label>
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

        {/* Image Upload & Preview */}
        <div className="form-control">
          <label className="label">
            <span className="label-text font-semibold">Loan Image</span>
          </label>
          <div className="flex items-center gap-4">
             {currentImage && (
                 <div className="avatar">
                    <div className="w-24 rounded-xl border">
                        <img src={currentImage} alt="Current Loan" />
                    </div>
                 </div>
             )}
              <input
                type="file"
                className="file-input file-input-bordered w-full"
                accept="image/png, image/jpeg, image/webp"
                {...register("image")}
              />
          </div>
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
            className={`btn btn-primary w-full ${submitting ? "loading" : ""}`}
            disabled={submitting}
          >
            {submitting ? "Updating..." : "Update Loan"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ManagerManageLoandetail;