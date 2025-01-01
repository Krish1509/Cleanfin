/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

// Define the prop types for PublicRoutes
interface PublicRoutesProps {
  children: ReactNode; // The component to render if access is granted
}

const PublicRoutes: React.FC<PublicRoutesProps> = ({ children }) => {
  const token = localStorage.getItem("userToken");
  return token ? <Navigate to="/dashboard" /> : <>{children}</>;
};

export default PublicRoutes;
