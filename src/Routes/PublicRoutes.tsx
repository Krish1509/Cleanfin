/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";

// Define the prop types for PublicRoutes
interface PublicRoutesProps {
  children: ReactNode; // The component to render if access is granted
}

const PublicRoutes: React.FC<PublicRoutesProps> = () => {
  const token = localStorage.getItem("userToken");
  return token ? <Navigate to="/dashboard" /> : <Outlet />;
};

export default PublicRoutes;
