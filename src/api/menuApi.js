import api from "./axios";

// Get all menu items
export const getMenu = () => {
  return api.get("/api/menu");
};

// Add menu item (ADMIN)
export const addMenuItem = (data) => {
  return api.post("/api/menu", data);
};

// Get menu by id
export const getMenuById = (id) => {
  return api.get(`/api/menu/${id}`);
};

// Update menu
export const updateMenuItem = (id, data) => {
  return api.put(`/api/menu/${id}`, data);
};

// Delete menu
export const deleteMenuItem = (id) => {
  return api.delete(`/api/menu/${id}`);
};
