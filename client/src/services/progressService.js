import API from "./api";

export const getMyProgress = async () => {
  const res = await API.get("/progress");
  return res.data;
};

export const completeCourse = async (courseId) => {
  const res = await API.put(`/progress/complete/${courseId}`);
  return res.data;
};

export const updateProgress = async (courseId, progress) => {
  const res = await API.put(`/progress/${courseId}`, {
    progress,
  });

  return res.data;
};