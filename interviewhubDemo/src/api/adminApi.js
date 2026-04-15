import api from "./axios";

// Admin login
export const loginAdmin = (data) =>
  api.post("/admin/login", data);

// Users
export const getUsers = () => api.get("/user");

// Experiences
export const getExperiences = () => api.get("/experience");

export const approveExperience = (id) =>
  api.put(`/experience/approve/${id}`);

export const rejectExperience = (id) =>
  api.put(`/experience/reject/${id}`);
``