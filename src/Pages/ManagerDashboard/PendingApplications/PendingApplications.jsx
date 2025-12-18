import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";

const PendingApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);

  const {
    data: pendingApplications = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["pending-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/application-loan/pending");
      return res.data;
    },
  });
  console.log(pendingApplications);
  const handleApprove = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to approve this loan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Approve it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/application-loan/status/${id}`,
            { status: "Approved" }
          );
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Approved!", "The loan has been approved.", "success");
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  const handleReject = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to reject this loan!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Reject it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.patch(
            `/application-loan/status/${id}`,
            { status: "Rejected" }
          );
          if (res.data.modifiedCount > 0) {
            refetch();
            Swal.fire("Rejected!", "The loan has been rejected.", "success");
          }
        } catch (error) {
          Swal.fire("Error!", "Something went wrong.", "error");
        }
      }
    });
  };

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Pending Applications: {pendingApplications.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>#</th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {pendingApplications.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No pending applications found.
                </td>
              </tr>
            ) : (
              pendingApplications.map((app, index) => (
                <tr key={app._id} className="hover">
                  <th>{index + 1}</th>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">
                          {app.firstName} {app.lastName}
                        </div>
                        <div className="text-sm opacity-50">{app.email}</div>
                      </div>
                    </div>
                  </td>
                  <td>${app.loanAmount}</td>
                  <td>{(app.submittedAt)}</td>
                  <td className="flex gap-2">
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="btn btn-sm btn-info text-white"
                    >
                      View
                    </button>
                    <button
                      onClick={() => handleApprove(app._id)}
                      className="btn btn-sm btn-success text-white"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleReject(app._id)}
                      className="btn btn-sm btn-error text-white"
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Details */}
      {selectedApplication && (
        <dialog id="my_modal_3" className="modal modal-open">
          <div className="modal-box w-11/12 max-w-3xl">
            <form method="dialog">
              <button
                onClick={() => setSelectedApplication(null)}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                ✕
              </button>
            </form>
            <h3 className="font-bold text-2xl text-center mb-4 text-primary">
              Loan Application Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-base-200 rounded-lg">
                <h4 className="font-bold border-b border-gray-400 mb-2">
                  Borrower Info
                </h4>
                <p>
                  <span className="font-semibold">Name:</span>{" "}
                  {selectedApplication.firstName} {selectedApplication.lastName}
                </p>
                <p>
                  <span className="font-semibold">Email:</span>{" "}
                  {selectedApplication.userEmail}
                </p>
                <p>
                  <span className="font-semibold">User ID:</span>{" "}
                  {selectedApplication._id || "N/A"}
                </p>
              </div>

              <div className="p-4 bg-base-200 rounded-lg">
                <h4 className="font-bold border-b border-gray-400 mb-2">
                  Loan Details
                </h4>
                <p>
                  <span className="font-semibold">Amount:</span> $
                  {selectedApplication.loanAmount}
                </p>
                <p>
                  <span className="font-semibold">Monthly Income:</span>{" "}
                  {selectedApplication.monthlyIncome} BDT ($)
                </p>
                <p>
                  <span className="font-semibold">Category:</span>{" "}
                  {selectedApplication.loanTitle}
                </p>
                <p>
                  <span className="font-semibold">Reason:</span>{" "}
                  {selectedApplication.reasonForLoan}
                </p>
                <p>
                  <span className="font-semibold">Status:</span>{" "}
                  <span className="badge badge-warning">
                    {selectedApplication.status}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Applied Date:</span>{" "}
                  {(selectedApplication.submittedAt)}
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-base-200 rounded-lg">
              <h4 className="font-bold border-b border-gray-400 mb-2">
                Additional Information
              </h4>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {selectedApplication.address}, {selectedApplication.city}
                {selectedApplication.country}
              </p>
              <p>
                <span className="font-semibold">National Id:</span>{" "}
                {selectedApplication.nationalId}
              </p>
            </div>

            <div className="modal-action">
              <button
                onClick={() => setSelectedApplication(null)}
                className="btn btn-error text-white"
              >
                Close
              </button>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default PendingApplications;
