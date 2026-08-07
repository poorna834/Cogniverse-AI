import API from "./api";

export const getKnowledge = async (search = "") => {
  const response = await API.get("/knowledge-notes", {
    params: { search },
  });

  return response.data;
};

export const getKnowledgeById = async (id) => {
  const response = await API.get(`/knowledge-notes/${id}`);
  return response.data;
};

export const createKnowledge = async (data) => {
  const response = await API.post("/knowledge-notes", data);
  return response.data;
};

export const updateKnowledge = async (id, data) => {
  const response = await API.put(`/knowledge-notes/${id}`, data);
  return response.data;
};

export const deleteKnowledge = async (id) => {
  const response = await API.delete(`/knowledge-notes/${id}`);
  return response.data;
};

export const downloadKnowledge = async (id) => {
  const response = await API.patch(`/knowledge-notes/download/${id}`);
  return response.data;
};