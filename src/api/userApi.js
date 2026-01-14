import api from "./axios";

export const createUser = (data) =>
  api.post("/api/users", data);

export const getUserById = (id) =>
  api.get(`/api/users/${id}`);
