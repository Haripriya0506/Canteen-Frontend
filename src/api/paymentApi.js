import api from "./axios";

// GET all payments (ADMIN or USER based on backend)
export const getPayments = () =>
  api.get("/api/payments");
