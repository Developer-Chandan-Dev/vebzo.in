import { useNavigate } from "react-router-dom";

const useHandleSwitchRoutes = () => {
  const navigate = useNavigate();

  const handleGoToLoginPage = () => {
    navigate("/login");
  };
  const handleGoToSignupPage = () => {
    navigate("/login");
  };
  const handleGoToUnAuthPage = () => {
    navigate("/un-auth");
  };

  return { handleGoToLoginPage, handleGoToSignupPage, handleGoToUnAuthPage };
};

export default useHandleSwitchRoutes;
