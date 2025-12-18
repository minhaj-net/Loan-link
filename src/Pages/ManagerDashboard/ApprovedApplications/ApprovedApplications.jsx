import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const ApprovedApplications = () => {
  const axiosSecure = useAxiosSecure();
  const [selectedApplication, setSelectedApplication] = useState(null);

  const { data: approvedApplications = [], isLoading } = useQuery({
    queryKey: ["approved-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/application-loan/approved");
      return res.data;
    },
  });

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div className="p-6 bg-base-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Approved Applications: {approvedApplications.length}
      </h2>
      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead>
            <tr className="bg-base-200">
              <th>Loan ID</th>
              <th>User Info</th>
              <th>Amount</th>
              <th>Approved Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {approvedApplications.length === 0 ? (
              <tr>
                <td colSpan="5" className="text-center py-4">
                  No approved applications found.
                </td>
              </tr>
            ) : (
              approvedApplications.map((app) => (
                <tr key={app._id} className="hover">
                  <td>
                    <span className="text-xs font-mono" title={app._id}>
                      {app._id.slice(-6).toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="flex items-center space-x-3">
                      <div>
                        <div className="font-bold">
                          {app.firstName} {app.lastName}
                        </div>
                        <div className="text-sm opacity-50">{app.email || app.userEmail}</div>
                      </div>
                    </div>
                  </td>
                  <td>${app.loanAmount}</td>
                  <td>
                    {app.approvedAt
                      ? new Date(app.approvedAt).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td>
                    <button
                      onClick={() => setSelectedApplication(app)}
                      className="btn btn-sm btn-info text-white"
                    >
                      View Details
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Modal Details (Reusing the same structure as PendingApplications) */}
      {selectedApplication && (
        <dialog id="approval_modal" className="modal modal-open">
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
                  {selectedApplication.userEmail || selectedApplication.email}
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
                  {selectedApplication.monthlyIncome} BDT
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
                  <span className="badge badge-success">
                    {selectedApplication.status}
                  </span>
                </p>
                <p>
                  <span className="font-semibold">Approved Date:</span>{" "}
                  {selectedApplication.approvedAt
                    ? new Date(selectedApplication.approvedAt).toLocaleString()
                    : "N/A"}
                </p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-base-200 rounded-lg">
              <h4 className="font-bold border-b border-gray-400 mb-2">
                Additional Information
              </h4>
              <p>
                <span className="font-semibold">Address:</span>{" "}
                {selectedApplication.address}, {selectedApplication.city},{" "}
                {selectedApplication.country}
              </p>
              <p>
                <span className="font-semibold">National ID:</span>{" "}
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

export default ApprovedApplications;