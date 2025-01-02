/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Define the prop types for PrivateRoute
interface PrivateRouteProps {
  children: ReactNode; // The component to render if access is granted
  allowedRoles: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  allowedRoles = [],
}) => {
  const token = localStorage.getItem("userToken");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  if (!token || !user?.role) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    // Redirect to an unauthorized page or home if role is not allowed
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;
