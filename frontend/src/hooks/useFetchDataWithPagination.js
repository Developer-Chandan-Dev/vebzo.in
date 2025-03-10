import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/userSlice";

const useFetchDataWithPagination = (
  url,
  currentPage,
  itemsPerPage,
  searchTerm,
  sortBy,
  minPrice,
  maxPrice
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(0); // Add a state to trigger re-fetch

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      console.log(searchTerm);
      try {
        const response = await axios.get(url, {
          params: {
            page: currentPage,
            limit: itemsPerPage,
            query: searchTerm,
            sortBy: sortBy,
            minPrice: minPrice,
            maxPrice: maxPrice,
          },
          withCredentials: true,
        }); // Waiting for get requests
        const resData = response.data;

        setData(resData); // Set fetched data in state
        setLoading(false);
        setError(null);
      } catch (error) {
        if (error.message === "Request failed with status code 404") {
          setError(error.message);
          setLoading(false);
          setData(null);
        }
        if (
          error?.response?.data?.message === "Not authrorized , no token" ||
          error?.response?.data?.message.includes("Not authrorized")
        ) {
          dispatch(logout());
          navigate("/login");
        }
        setError(error.response.data.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [
    currentPage,
    itemsPerPage,
    maxPrice,
    minPrice,
    searchTerm,
    sortBy,
    url,
    refresh,
  ]);

  const refreshData = () => setRefresh((prev) => prev + 1);

  return { data, error, loading, setLoading, setData, setError, refreshData };
};

export default useFetchDataWithPagination;
