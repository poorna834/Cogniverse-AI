import API from "./api";

// Get all certificates of logged-in user
export const getMyCertificates = async () => {
  const response = await API.get("/certificates");
  return response.data;
};

// Get a single certificate by ID
export const getCertificateById = async (id) => {
  const response = await API.get(`/certificates/${id}`);
  return response.data;
};