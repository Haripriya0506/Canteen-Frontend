import axiosInstance from "./axiosInstance";

// 🍽️ Get all menu items
export const getMenu = () => {
  return axiosInstance.get("/api/menu");
};

// ➕ Add menu item (ADMIN)
export const addMenuItem = (data) => {
  return axiosInstance.post("/api/menu", data);
};

// 🔍 Get menu by ID
export const getMenuById = (id) => {
  return axiosInstance.get(`/api/menu/${id}`);
};

// ✏️ Update menu item
export const updateMenuItem = (id, data) => {
  return axiosInstance.put(`/api/menu/${id}`, data);
};

// ❌ Delete menu item
export const deleteMenuItem = (id) => {
  return axiosInstance.delete(`/api/menu/${id}`);
};
