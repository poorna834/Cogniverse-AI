import API from "./api";

export const createStudyTask = async (taskData) => {
  const response = await API.post("/study-planner", taskData);
  return response.data;
};

export const getStudyTasks = async (date = "") => {
  const response = await API.get("/study-planner", {
    params: date ? { date } : {},
  });
  return response.data;
};

export const updateStudyTask = async (id, taskData) => {
  const response = await API.put(`/study-planner/${id}`, taskData);
  return response.data;
};

export const deleteStudyTask = async (id) => {
  const response = await API.delete(`/study-planner/${id}`);
  return response.data;
};

export const toggleStudyTask = async (id) => {
  const response = await API.patch(`/study-planner/toggle/${id}`);
  return response.data;
};