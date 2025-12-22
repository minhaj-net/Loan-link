import axios from "axios";
import React from "react";
const axiosSecure = axios.create({
  baseURL: "https://loan-link-server-sable.vercel.app/",
});

const useAxiosSecure = () => {
  return axiosSecure;
};

export default useAxiosSecure;
