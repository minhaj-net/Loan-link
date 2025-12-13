import React, { useState } from "react";
import useLoanApplications from "../../../Hooks/useLoanApplications";

const LoanApplications = () => {
  const [applications, loading] = useLoanApplications();
  const [filter, setFilter] = useState("all");
  const [selectedApplication, setSelectedApplication] = useState(null);
console.log(selectedApplication);
  const handleViewClick = (application) => {
    setSelectedApplication(application);
    document.getElementById("view_application_modal").showModal();
  };

  const filteredApplications = applications.filter((app) => {
    if (filter === "all") return true;
    return app.status === filter; // Assuming 'status' field exists
  });

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="w-full p-5">
      <h2 className="text-3xl font-semibold mb-5">
        Loan Applications: {applications.length}
      </h2>

      {/* Filter */}
      <div className="mb-5">
        <label className="mr-2 font-semibold">Filter by Status:</label>
        <select
          className="select select-bordered w-full max-w-xs"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Loan ID</th>
              <th>User (Email, Name)</th>
              <th>Category</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app, index) => (
              <tr key={app._id}>
                <th>{index + 1}</th>
                <td>{app._id}</td>
                <td>
                  <div>
                    <div className="font-bold">{app.name}</div>
                    <div className="text-sm opacity-50">{app.userEmail}</div>
                  </div>
                </td>
                <td>{app.category}</td>
                <td>${app.loanAmount}</td>
                <td>
                  <span
                    className={`badge ${
                      app.status === "approved"
                        ? "badge-success"
                        : app.status === "rejected"
                        ? "badge-error"
                        : "badge-warning"
                    }`}
                  >
                    {app.status || "Pending"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleViewClick(app)}
                    className="btn btn-ghost btn-xs bg-blue-500 text-white hover:bg-blue-600"
                  >
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* View Modal */}
      <dialog id="view_application_modal" className="modal">
        <div className="modal-box w-11/12 max-w-3xl">
          <h3 className="font-bold text-lg mb-4">Loan Application Details</h3>
          {selectedApplication && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p><strong>Loan ID:</strong> {selectedApplication._id}</p>
                <p><strong>Name:</strong> {selectedApplication?.name}</p>
                <p><strong>Email:</strong> {selectedApplication?.userEmail}</p>
                <p><strong>Category:</strong> {selectedApplication?.category}</p>
                <p><strong>Amount:</strong> ${selectedApplication?.loanAmount}</p>
                <p><strong>Status:</strong> {selectedApplication?.status || "Pending"}</p>
              </div>
              <div>
                 {/* Add more fields here as needed based on the data structure */}
                 {/* Example fields based on common loan apps */}
                 {selectedApplication.date && <p><strong>Date:</strong> {selectedApplication.date}</p>}
                 {selectedApplication.deadline && <p><strong>Deadline:</strong> {selectedApplication.deadline}</p>}
                 {selectedApplication.address && <p><strong>Address:</strong> {selectedApplication.address}</p>}
                 {/* Render all other keys dynamically if structure is unknown */}
                 {/* Object.entries(selectedApplication).map(([key, value]) => (
                    <p key={key} className="break-words"><strong>{key}:</strong> {JSON.stringify(value)}</p>
                 )) */}
              </div>
            </div>
          )}
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default LoanApplications;