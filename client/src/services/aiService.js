import API from "./api";

// Send question to Pixi AI
export const askAI = async (question) => {
  const response = await API.post("/ai/chat", {
    question,
  });

  return response.data;
};

// Get previous chat history
export const getChatHistory = async () => {
  const response = await API.get("/ai/history");
  return response.data;
};

// Clear chat history
export const clearChatHistory = async () => {
  const response = await API.delete("/ai/history");
  return response.data;
};