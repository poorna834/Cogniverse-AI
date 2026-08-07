import API from "./api";

export const getCourses = async (search = "") => {
  const response = await API.get("/courses", {
    params: { search },
  });

  return response.data;
};

export const createCourse = async (courseData) => {
  const response = await API.post("/courses", courseData);
  return response.data;
};

export const deleteCourse = async (id) => {
  const response = await API.delete(`/courses/${id}`);
  return response.data;
};

export const updateCourse = async (id, courseData) => {
  const response = await API.put(`/courses/${id}`, courseData);
  return response.data;
};