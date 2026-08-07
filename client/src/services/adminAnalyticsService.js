import API from "./api";

export const getAdminAnalytics = async () => {
  const response = await API.get("/admin/analytics");
  return response.data;
};