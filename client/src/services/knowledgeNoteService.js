import API from "./api";

export const getKnowledgeNotes = async (search = "") => {
  const response = await API.get("/knowledge-notes", {
    params: { search },
  });

  return response.data;
};

export const getKnowledgeNote = async (id) => {
  const response = await API.get(`/knowledge-notes/${id}`);
  return response.data;
};

export const createKnowledgeNote = async (data) => {
  const response = await API.post("/knowledge-notes", data);
  return response.data;
};

export const updateKnowledgeNote = async (id, data) => {
  const response = await API.put(`/knowledge-notes/${id}`, data);
  return response.data;
};

export const deleteKnowledgeNote = async (id) => {
  const response = await API.delete(`/knowledge-notes/${id}`);
  return response.data;
};

export const downloadKnowledgeNote = async (id) => {
  const response = await API.patch(`/knowledge-notes/download/${id}`);
  return response.data;
};