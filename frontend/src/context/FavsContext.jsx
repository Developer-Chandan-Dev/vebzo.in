/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logout } from '../store/features/userSlice.js'
import authService from '../features/auth.js'

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const FavsContext = createContext();

const FavsContextProvider = (props) => {
  // const { handleLogout } = useHandleSwitchRoutes();
  const [favs, setFavs] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const [favsCount, setFavsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const authUser = useSelector((state) => state.user.user);


  const dispatch = useDispatch();

  const getFavoriteProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${VITE_API_URL}/api/v1/users/favorites/${authUser?._id}`,
        { withCredentials: true }
      );

      if (response?.data?.success) {
        setFavs(response.data.favorites);
        setFavIds(response.data.favoriteIds);
        setFavsCount(response?.data?.favoriteIds?.length || 0);
        setLoading(false);
      }
      setLoading(false);
    } catch (error) {

      toast.error(error.message);

      if (error?.response?.data?.message === "Not authrorized , no token") {
        const res = await authService.logout();
        if (res?.data?.success === true) {
          toast.success(res.data.message);
          // navigate("/");
        } else {
          toast.error(res.data.message);
        }
        dispatch(logout());
      }
      setLoading(false);
    }
  };
  useEffect(() => {
    if (authUser) {
      getFavoriteProducts();
    }
  }, [authUser]);

  const value = {
    favs,
    setFavs,
    favIds,
    setFavIds,
    favsCount,
    setFavsCount,
    getFavoriteProducts,
    loading,
    setLoading,
  };

  return (
    <FavsContext.Provider value={value}>{props.children}</FavsContext.Provider>
  );
};

export default FavsContextProvider;
