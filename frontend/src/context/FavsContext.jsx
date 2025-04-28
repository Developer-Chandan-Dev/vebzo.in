/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const VITE_API_URL = import.meta.env.VITE_API_URL;

export const FavsContext = createContext();

const FavsContextProvider = (props) => {
  const [favs, setFavs] = useState([]);
  const [favIds, setFavIds] = useState([]);
  const [favsCount, setFavsCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const authUser = useSelector((state) => state.user.user);

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
      console.log(error);
      toast.error(error.message);
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
