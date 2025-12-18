import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useAuth } from "../../../Hooks/useAuth";
import Swal from "sweetalert2";
import { loadStripe } from "@stripe/stripe-js";

const MyLoans = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [selectedLoan, setSelectedLoan] = useState(null);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // Fetch loans for the logged-in user
  const {
    data: myLoans = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["myLoans", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/application-loan/my-application?email=${user.email}`
      );
      return res.data;
    },
  });
  console.log(myLoans);
  // Handle Cancel Loan
  const handleCancelLoan = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, cancel it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/application-loan/my-application/${id}`)
          .then((res) => {
            if (res.data.deletedCount > 0) {
              Swal.fire(
                "Canceled!",
                "Your loan application has been canceled.",
                "success"
              );
              refetch();
            }
          })
          .catch((error) => {
            console.error(error);
            Swal.fire("Error!", "Failed to cancel loan application.", "error");
          });
      }
    });
  };

  // Handle Pay Button Click
  // const handlePay = async (loan) => {
  //   try {
  //     const response = await axiosSecure.post("/create-checkout-session", {
  //       loanId: loan._id,
  //       loanInfo: loan.loan_type || "Loan Application", // Adjust field name based on your data
  //       amount: 10,
  //       email: user.email,
  //     });

  //     if (response.data.id) {
  //       // Redirect to Stripe Checkout
  //       const stripe = await import("@stripe/stripe-js").then((module) =>
  //         module.loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)
  //       );
  //       await stripe.redirectToCheckout({ sessionId: response.data.id });
  //     }
  //   } catch (error) {
  //     console.error("Payment Error:", error);
  //     Swal.fire("Error", "Failed to initiate payment.", "error");
  //   }
  // };

  const handlePay = async (loan) => {
    try {
      // 1️⃣ Create Checkout Session on backend
      const response = await axiosSecure.post("/create-checkout-session", {
        loanId: loan._id,
        loanInfo: loan.loan_type || "Loan Application", // Adjust based on your data
        amount: 10,
        email: user.email,
      });

      const { url } = response.data;

      if (!url) {
        throw new Error("No payment URL returned from backend");
      }

      // 2️⃣ Redirect to Stripe Checkout using URL
      window.location.href = url;
    } catch (error) {
      console.error("Payment Error:", error);
      Swal.fire(
        "Payment Error",
        error.message || "Failed to initiate payment.",
        "error"
      );
    }
  };

  // Handle View Details
  const handleViewDetails = (loan) => {
    setSelectedLoan(loan);
    setIsViewModalOpen(true);
  };

  const handleCreatePaymentModal = (loan) => {
    setSelectedLoan(loan);
    setIsPayModalOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">My Loans</h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr>
              <th>Loan ID</th>
              <th>Loan Info</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Application Fee</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {myLoans.map((loan) => (
              <tr key={loan._id}>
                <td>{loan._id}</td>
                <td>
                  <div className="font-bold">{loan.loanTitle}</div>
                  <div className="text-sm opacity-50">{loan.sub_category}</div>
                </td>
                <td>${loan.loanAmount}</td>
                <td>
                  <span
                    className={`badge ${
                      loan.status === "Approved"
                        ? "badge-success"
                        : loan.status === "Rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {loan.status}
                  </span>
                </td>
                <td>
                  {loan.applicationFee === "Paid" ? (
                    <button
                      className="btn btn-xs btn-success text-white"
                      onClick={() => handleCreatePaymentModal(loan)}
                    >
                      Paid
                    </button>
                  ) : (
                    <span className="text-error">Unpaid</span>
                  )}
                </td>
                <td className="flex gap-2">
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => handleViewDetails(loan)}
                  >
                    View
                  </button>
                  {loan.status === "Pending" && (
                    <button
                      className="btn btn-sm btn-error"
                      onClick={() => handleCancelLoan(loan._id)}
                    >
                      Cancel
                    </button>
                  )}

                  {loan.applicationFee !== "Paid" && (
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => handlePay(loan)}
                    >
                      Pay $10
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Details Modal */}
      {isViewModalOpen && selectedLoan && (
        <dialog id="view_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Loan Details</h3>
            <div className="py-4">
              <p>
                <strong>Loan ID:</strong> {selectedLoan._id}
              </p>
              <p>
                <strong>Type:</strong> {selectedLoan.reasonForLoan}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedLoan.loanAmount}
              </p>
              <p>
                <strong>Status:</strong> {selectedLoan.status}
              </p>
              <p>
                <strong>Applied Date:</strong> {selectedLoan.submittedAt}
              </p>
              {/* Add more fields as needed */}
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsViewModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}

      {/* Payment Details Modal */}
      {isPayModalOpen && selectedLoan && selectedLoan.paymentDetails && (
        <dialog id="pay_modal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Payment Details</h3>
            <div className="py-4">
              <p>
                <strong>User Email:</strong> {selectedLoan.paymentDetails.email}
              </p>
              <p>
                <strong>Transaction ID:</strong>{" "}
                {selectedLoan.paymentDetails.transactionId}
              </p>
              <p>
                <strong>Loan ID:</strong> {selectedLoan._id}
              </p>
              <p>
                <strong>Amount:</strong> ${selectedLoan.paymentDetails.amount}
              </p>
              <p>
                <strong>Date:</strong>{" "}
                {new Date(
                  selectedLoan.paymentDetails.paymentDate
                ).toLocaleString()}
              </p>
              <p>
                <strong>Status:</strong> {selectedLoan.paymentDetails.status}
              </p>
            </div>
            <div className="modal-action">
              <button className="btn" onClick={() => setIsPayModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default MyLoans;
