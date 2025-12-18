import React from "react";
import { useAuth } from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const MyProfile = () => {
  const { user } = useAuth();
  const [role] = useRole();

  return (
    <div className="flex justify-center items-center h-full min-h-[50vh]">
      <div className="card w-96 bg-base-100 shadow-xl border border-gray-200">
        <figure className="px-10 pt-10">
          <div className="avatar">
            <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
              <img
                src={
                  user?.photoURL ||
                  "https://i.ibb.co.com/MgsTCcv/avater.jpg"
                }
                alt="Profile"
              />
            </div>
          </div>
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="card-title text-2xl font-bold">
            {user?.displayName || "User Name"}
          </h2>
          {role && (
            <div className="badge badge-primary badge-outline capitalize mt-1">
              {role}
            </div>
          )}
          <p className="text-gray-600 mt-2">{user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default MyProfile;