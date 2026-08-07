import API from "./api";

export const getRoadmaps = async () => {
  const response = await API.get("/roadmaps");
  return response.data;
};

export const getRoadmapById = async (id) => {
  const response = await API.get(`/roadmaps/${id}`);
  return response.data;
};

export const createRoadmap = async (payload) => {
  const response = await API.post("/roadmaps", payload);
  return response.data;
};

export const updateRoadmap = async (id, payload) => {
  const response = await API.put(`/roadmaps/${id}`, payload);
  return response.data;
};

export const deleteRoadmap = async (id) => {
  const response = await API.delete(`/roadmaps/${id}`);
  return response.data;
};

export const getRoadmapProgress = async (roadmapId) => {
  const response = await API.get(`/roadmap-progress/${roadmapId}`);
  return response.data;
};