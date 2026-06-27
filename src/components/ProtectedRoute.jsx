import { Navigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function ProtectedRoute({
  children,
  allowedRoles
}) {
  const { user, token } = useContext(AuthContext);

  
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  
  if (
    allowedRoles &&
    !allowedRoles.includes(user?.role)
  ) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}