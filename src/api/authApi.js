import axiosInstance from "./axios";

// LOGIN
export const login = async (email, password) => {
  const response = await axiosInstance.post("/api/auth/login", {
    email,
    password,
  });

  const token = response.data.token;

  if (!token) {
    throw new Error("Token missing from backend response");
  }

  localStorage.setItem("token", token);
  return token;
};

// REGISTER ✅ ADD THIS
export const registerUser = async (userData) => {
  const response = await axiosInstance.post("/api/auth/register", userData);
  return response.data;
};

// LOGOUT
export const logout = async () => {
  localStorage.removeItem("token");
};
