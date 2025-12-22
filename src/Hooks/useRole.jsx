import React from "react";
import { useAuth } from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const useRole = () => {
  const { user } = useAuth();

  const { data: role, isLoading: isRoleLoading } = useQuery({
    queryKey: ["role", user?.email],
    enabled: !!user?.email, // prevents running when email not available
    queryFn: async () => {
      const res = await axios.get(
        `https://loan-link-server-sable.vercel.app/user/role/${user?.email}`
      );
      return res.data.role; // FIXED
    },
  });

  return [role, isRoleLoading];
};

export default useRole;
