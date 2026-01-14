import api from "./axios";

export const addCategory = (data) =>
  api.post("/api/categories", data);

export const getCategoryById = (id) =>
  api.get(`/api/categories/${id}`);

export const updateCategory = (id, data) =>
  api.put(`/api/categories/${id}`, data);

export const deleteCategory = (id) =>
  api.delete(`/api/categories/${id}`);
