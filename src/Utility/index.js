import axios from "axios";

//save or update USER database
export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(`https://loan-link-server-sable.vercel.app/user`, userData);
  return data;
};
