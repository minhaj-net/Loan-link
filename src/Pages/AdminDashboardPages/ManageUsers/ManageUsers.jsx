import React, { useState } from "react";
import useAllUsers from "../../../Hooks/useAllUsers";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";

const ManageUsers = () => {
  const [users, loading, refetch] = useAllUsers();
  const axiosSecure = useAxiosSecure();
  const [selectedUser, setSelectedUser] = useState(null);
  const { register, handleSubmit, reset, watch, setValue } = useForm();

  // Watch the status field to conditionally render suspend fields
  const status = watch("status");

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setValue("role", user.role);
    setValue("status", user.status || "active"); // Default to active if undefined
    setValue("suspendReason", user.suspendReason || "");
    setValue("suspendFeedback", user.suspendFeedback || "");
    document.getElementById("update_user_modal").showModal();
  };

  const onSubmit = async (data) => {
    try {
      const updateData = {
        role: data.role,
        status: data.status,
        suspendReason: data.status === "suspended" ? data.suspendReason : null,
        suspendFeedback: data.status === "suspended" ? data.suspendFeedback : null,
      };

      const res = await axiosSecure.patch(
        `/user/admin/${selectedUser._id}`,
        updateData
      );

      if (res.data.modifiedCount > 0) {
        refetch();
        document.getElementById("update_user_modal").close();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${selectedUser.name}'s role/status has been updated`,
          showConfirmButton: false,
          timer: 1500,
        });
        reset();
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
      });
    }
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="w-full p-5">
      <h2 className="text-3xl font-semibold mb-5">Manage Users: {users.length}</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user._id}>
                <th>{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span
                    className={`badge ${
                      user.status === "suspended"
                        ? "badge-error"
                        : "badge-success"
                    }`}
                  >
                    {user.status || "active"}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleEditClick(user)}
                    className="btn btn-ghost btn-xs bg-orange-500 text-white hover:bg-orange-600"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <dialog id="update_user_modal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-4">Update User</h3>
          {selectedUser && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  value={selectedUser.name}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  value={selectedUser.email}
                  readOnly
                  className="input input-bordered w-full bg-gray-100"
                />
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Role</span>
                </label>
                <select
                  {...register("role")}
                  className="select select-bordered w-full"
                >
                  <option value="borrower">Borrower</option>
                  <option value="manager">Manager</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="form-control w-full mb-4">
                <label className="label">
                  <span className="label-text">Status</span>
                </label>
                <select
                  {...register("status")}
                  className="select select-bordered w-full"
                >
                  <option value="active">Active</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              {status === "suspended" && (
                <>
                  <div className="form-control w-full mb-4">
                    <label className="label">
                      <span className="label-text">Suspend Reason</span>
                    </label>
                    <input
                      type="text"
                      {...register("suspendReason", { required: true })}
                      placeholder="Reason for suspension"
                      className="input input-bordered w-full"
                    />
                  </div>
                  <div className="form-control w-full mb-4">
                    <label className="label">
                      <span className="label-text">Feedback</span>
                    </label>
                    <textarea
                      {...register("suspendFeedback", { required: true })}
                      placeholder="Feedback for the user"
                      className="textarea textarea-bordered w-full"
                    ></textarea>
                  </div>
                </>
              )}

              <div className="modal-action">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button
                  type="button"
                  className="btn"
                  onClick={() => document.getElementById("update_user_modal").close()}
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      </dialog>
    </div>
  );
};

export default ManageUsers;
