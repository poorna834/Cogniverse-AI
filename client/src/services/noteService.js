import API from "./api";

export const createNote = async (noteData) => {
  const response = await API.post("/notes", noteData);
  return response.data;
};

export const getNotes = async (search = "", category = "") => {
  const response = await API.get("/notes", {
    params: { search, category },
  });
  return response.data;
};

export const getNoteById = async (id) => {
  const response = await API.get(`/notes/${id}`);
  return response.data;
};

export const updateNote = async (id, noteData) => {
  const response = await API.put(`/notes/${id}`, noteData);
  return response.data;
};

export const deleteNote = async (id) => {
  const response = await API.delete(`/notes/${id}`);
  return response.data;
};

export const togglePinNote = async (id) => {
  const response = await API.patch(`/notes/pin/${id}`);
  return response.data;
};