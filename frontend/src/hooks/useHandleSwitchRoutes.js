import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import authService from '../features/auth'
import { logout } from '../store/features/userSlice.js'
const useHandleSwitchRoutes = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleGoToLoginPage = () => {
    navigate("/login");
  };
  const handleGoToSignupPage = () => {
    navigate("/login");
  };
  const handleGoToUnAuthPage = () => {
    navigate("/un-auth");
  };
  const handleLogout = async () => {
    const res = await authService.logout();
    if (res?.data?.success === true) {
      toast.success(res.data.message)
      navigate("/")
    } else {
      toast.error(res.data.message)
    }
    dispatch(logout())
  }

  return { handleGoToLoginPage, handleGoToSignupPage, handleGoToUnAuthPage, handleLogout };
};

export default useHandleSwitchRoutes;
