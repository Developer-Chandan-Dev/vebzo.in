import { useSelector } from "react-redux";

const usePrivateRoute = () => {
  const user = useSelector((state) => state.user.user);

  // Check if the user is authenticated (token exists in localStorage)
  const isAuthenticated = () => {
    console.log(user);
    return !!user; // return true if token exists
  };

  const hasRole = (allowedRoles) => {
    console.log(user, allowedRoles);
    return user && allowedRoles.includes(user.role);
  };

  return { isAuthenticated, hasRole };
};

export default usePrivateRoute;
