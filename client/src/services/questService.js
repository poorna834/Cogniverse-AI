import API from "./api";

export const getTodayQuests = async () => {
  const response = await API.get("/quests/today");
  return response.data;
};

export const completeQuest = async (questId) => {
  const response = await API.put(`/quests/complete/${questId}`);
  return response.data;
};