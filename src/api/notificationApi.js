import api from "./axios";

// GET notifications for user
export const getUserNotifications = (userId) =>
  api.get(`/notifications/user/${userId}`);

// GET unread notifications
export const getUnreadNotifications = (userId) =>
  api.get(`/notifications/user/${userId}/unread`);
