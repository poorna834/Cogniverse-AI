import API from "./api";

export const generateCareerRoadmap = async (data) => {
  const response = await API.post(
    "/career-roadmap/generate",
    data
  );

  return response.data;
};

export const getMyCareerRoadmap = async () => {
  const response = await API.get(
    "/career-roadmap/my-roadmap"
  );

  return response.data;
};