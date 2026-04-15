import api from "./axios";

// ✅ Register
export const registerUser = (data) => {
  return api.post("/auth/register", data);
};

// ✅ Login
export const loginUser = (data) => {
  return api.post("/auth/login", data);
};

// ✅ Forgot Password
export const resetPassword = (email, hobby, newPassword) => {
  return api.post(
    `/auth/reset?email=${email}&hobby=${hobby}&newPassword=${newPassword}`
  );
};