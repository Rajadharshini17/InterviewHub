import api from "./axios";

// ✅ Get all experiences
export const getAllExperiences = () => {
  return api.get("/experience");
};

// ✅ Like experience
export const likeExperience = (id) => {
  return api.put(`/experience/like/${id}`);
};

// ✅ Search by company
export const searchByCompany = (company) => {
  return api.get(`/experience/search/company?company=${company}`);
};

// ✅ Search by role
export const searchByRole = (role) => {
  return api.get(`/experience/search/role?role=${role}`);
};