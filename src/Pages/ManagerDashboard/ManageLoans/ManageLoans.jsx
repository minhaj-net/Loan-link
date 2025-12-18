import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Link } from "react-router";
import { Edit, Trash2, Search, Filter } from "lucide-react";

const ManageLoans = () => {
  const [loans, setLoans] = useState([]);
  const [filteredLoans, setFilteredLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  const categories = [
    "Personal Loan",
    "Education Loan",
    "Business Loan",
    "Medical Loan",
    "Agriculture Loan",
  ];

  // Fetch Loans
  const fetchLoans = async () => {
    try {
      const response = await axios.get("http://localhost:3000/all-loans");
      setLoans(response.data);
      setFilteredLoans(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching loans:", error);
      Swal.fire("Error", "Failed to fetch loans", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLoans();
  }, []);

  // Filter & Search Logic
  useEffect(() => {
    let result = loans;

    if (searchTerm) {
      result = result.filter((loan) =>
        loan.loanTitle.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (category) {
      result = result.filter((loan) => loan.category === category);
    }

    setFilteredLoans(result);
  }, [searchTerm, category, loans]);

  // Delete Loan
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true ,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await axios.delete(
            `http://localhost:3000/all-loans/${id}`
          );
          if (response.data.deletedCount > 0 || response.status === 200) {
            Swal.fire("Deleted!", "Loan has been deleted.", "success");
            fetchLoans(); // Refresh list
          }
        } catch (error) {
          console.error("Error deleting loan:", error);
          Swal.fire("Error", "Failed to delete loan", "error");
        }
      }
    });
  };

  if (loading) {
    return (
        <div className="flex justify-center items-center h-64">
             <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
    )
  }

  return (
    <div className="w-full p-6 bg-base-100 shadow-xl rounded-xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold text-primary">Manage Loans</h2>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search by Title..."
              className="input input-bordered pl-10 w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="relative w-full sm:w-48">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <select
              className="select select-bordered pl-10 w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* head */}
          <thead className="bg-base-200 text-base-content">
            <tr>
              <th>Image</th>
              <th>Title</th>
              <th>Interest Rate</th>
              <th>Category</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredLoans.length > 0 ? (
              filteredLoans.map((loan) => (
                <tr key={loan._id} className="hover">
                  <td>
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        {loan.loanImage ? (
                            <img src={loan.loanImage} alt={loan.loanTitle} />
                        ) : (
                             <img src="https://via.placeholder.com/150" alt="No Img" />
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="font-semibold">{loan.loanTitle}</td>
                  <td>
                    <span className="badge badge-ghost font-medium">
                      {loan.interestRate}
                    </span>
                  </td>
                  <td>
                    <span className="badge badge-primary badge-outline">
                      {loan.category}
                    </span>
                  </td>
                  <td className="flex justify-center gap-3">
                    <Link
                      to={`/dashboard/update-loan/${loan._id}`}
                      className="btn btn-sm btn-info text-white"
                      title="Update"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(loan._id)}
                      className="btn btn-sm btn-error text-white"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center py-8 text-gray-500">
                  No loans found matching your criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageLoans;