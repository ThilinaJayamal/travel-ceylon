// components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import { useServiceAuthStore } from "../store/serviceAuthStrore";

// For normal users
export const UserRoute = ({ children }) => {
  const user = useAuthStore((state) => state.user);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

// For service providers
export const ProviderRoute = ({ children }) => {
  const provider = useServiceAuthStore((state) => state.user);
  if (!provider) {
    return <Navigate to="/service-provider/login" replace />;
  }
  return children;
};
