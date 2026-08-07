import API from "./api";

export const addBookmark = async (courseId) => {
  const response = await API.post(`/bookmarks/${courseId}`);
  return response.data;
};

export const getBookmarks = async () => {
  const response = await API.get("/bookmarks");
  return response.data;
};

export const removeBookmark = async (courseId) => {
  const response = await API.delete(`/bookmarks/${courseId}`);
  return response.data;
};