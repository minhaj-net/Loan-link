import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useLoanApplications = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: applications = [],
    isLoading: loading,
    refetch,
  } = useQuery({
    queryKey: ["loan-applications"],
    queryFn: async () => {
      const res = await axiosSecure.get("/application-loan");
      return res.data;
    },
  });

  return [applications, loading, refetch];
};

export default useLoanApplications;
