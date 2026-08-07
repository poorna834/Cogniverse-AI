import API from "./api";

export const getLearningAnalytics = async () => {
  const response = await API.get("/learning-analytics");
  return response.data;
};