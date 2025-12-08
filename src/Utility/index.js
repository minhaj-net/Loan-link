import axios from "axios";

//save or update USER database
export const saveOrUpdateUser = async (userData) => {
  const { data } = await axios.post(`http://localhost:3000/user`, userData);
  return data;
};
