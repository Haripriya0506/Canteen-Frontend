import axiosInstance from "./axiosInstance";

// 🔑 LOGIN
export const login = async (email, password) => {
  // 🔥 IMPORTANT: clear old token
  localStorage.removeItem("token");

  const response = await axiosInstance.post("/api/auth/login", {
    email: email.trim().toLowerCase(), // ✅ FIX
    password,
  });

  const token = response.data?.token;

  if (!token) {
    throw new Error("Token missing from backend response");
  }

  localStorage.setItem("token", token);
  return response.data;
};

// 📝 REGISTER
export const registerUser = async (userData) => {
  const payload = {
    ...userData,
    email: userData.email.trim().toLowerCase(), // ✅ FIX
    name: userData.name.trim(),
  };

  const response = await axiosInstance.post(
    "/api/auth/register",
    payload
  );

  return response.data;
};

// 🚪 LOGOUT
export const logout = () => {
  localStorage.removeItem("token");
};
