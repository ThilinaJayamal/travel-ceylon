import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, allowedRoles, currentUser }) => {
  if (!currentUser) return <Navigate to="/" />;
  if (allowedRoles && !allowedRoles.includes(currentUser.role)) return <Navigate to="/" />;
  return children;
};

export default ProtectedRoute;
