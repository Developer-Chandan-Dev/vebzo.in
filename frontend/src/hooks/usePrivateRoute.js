import { useSelector } from "react-redux";

const usePrivateRoute = () => {
  const user = useSelector((state) => state.user.user);

  // Check if the user is authenticated (token exists in localStorage)
  const isAuthenticated = () => {
    
    return !!user; // return true if token exists
  };

  const hasRole = (allowedRoles) => {

    return user && allowedRoles.includes(user.role);
  };

  return { isAuthenticated, hasRole };
};

export default usePrivateRoute;
