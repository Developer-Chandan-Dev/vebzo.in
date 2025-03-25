/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import usePrivateRoute from "../../hooks/usePrivateRoute";

const RoleProtectedRoute = ({ children, allowedRoles }) => {
  const { isAuthenticated, hasRole } = usePrivateRoute();

  //   If the user is not authenticated, redirect to login
  if (!isAuthenticated) {

    return <Navigate to="/login" />;
  }

  // If the user does not have the required role, redirect the unauthorized
  if (!hasRole(allowedRoles)) {
    return <Navigate to="/unauthorized" />; // A route for unauthorized access
  }

  //   If authenticated and role matches, allow access to the component
  return children;
};

export default RoleProtectedRoute;
