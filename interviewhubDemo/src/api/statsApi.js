import api from "./axios";

export const getStats = () => {
  return api.get("/stats");
};