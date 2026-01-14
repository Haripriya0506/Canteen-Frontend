import api from "./axios";

// PLACE ORDER (USER)
export const placeOrder = (data) =>
  api.post("/api/orders", data);
