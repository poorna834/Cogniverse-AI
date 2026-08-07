import API from "./api";

export const getAchievements = async () => {
  const response = await API.get("/achievements");
  return response.data;
};