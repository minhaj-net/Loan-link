// import React, { use } from "react";
// import { AuthContext } from "../Context/AuthContext/AuthContext";

import { useContext } from "react";
import { AuthContext } from "../Context/AuthContext/AuthContext";
// 
// const useAuth = () => {
//   const authInfo = use(AuthContext);
//   return authInfo;
// };

// export default useAuth;
export const useAuth = () => {
  const context = useContext(AuthContext);
 
  return context;
};
