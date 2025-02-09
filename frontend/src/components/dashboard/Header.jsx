/* eslint-disable react/prop-types */

import { LogOut } from "lucide-react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { Navigate } from 'react-router-dom'
import authService from "../../features/auth";
import { logout } from "../../store/features/userSlice";

const Header = ({ title = "Title" }) => {
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await authService.logout();
    console.log(res);
    if (res.data.success === true) {
      toast.success(res.data.message);
      <Navigate to="/"/>
    } else {
      toast.error(res.data.message);
    }

    // Dispatch the logout action
    dispatch(logout());
  };

  return (
    <header className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg border-b border-gray-700">
      <div className="max-w-7xl mx-auto py-4 px-4 lg:px-8 flex-between gap-3">
        <h1 className="text-2xl font-semibold text-gray-100">{title}</h1>
        <LogOut onClick={handleLogout} className="size-5 font-bold transition-all text-gray-300 hover:text-gray-50 cursor-pointer" title="Logout" />
      </div>
    </header>
  );
};

export default Header;
