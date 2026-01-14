import React from "react";
import { Navigate } from "react-router-dom";

const AuthGate = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/home" />;
  }

  // First time users go to register
  return <Navigate to="/register" />;
};

export default AuthGate;
