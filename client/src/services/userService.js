import API from "./api";

export const updateProfile = async (profileData) => {
  const response = await API.put("/users/profile", profileData);
  return response.data;
};