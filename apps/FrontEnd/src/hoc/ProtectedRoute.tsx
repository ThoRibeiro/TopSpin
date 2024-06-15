import React from "react";
import { Navigate, RouteProps } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

interface ProtectedRouteProps extends RouteProps {
  element: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated } = useAuth();

  return isAuthenticated ? element : <Navigate to="/login" />;
};

export default ProtectedRoute;
