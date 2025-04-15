import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/features/userSlice";

const useFetchDataWithPagination = (url, params = null) => { // Accept params as null by default
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(0);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(url, {
          params: params || {}, // If params is null, use an empty object
          withCredentials: true,
        });
        const resData = response.data;
        
        setData(resData);
        setLoading(false);
        setError(null);
      } catch (error) {
        console.log(error);
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
        setError(error.response?.data?.message || "Something went wrong");
        setLoading(false);
      }
    };
    fetchData();
  }, [url, params, refresh]); // Now it's safe to include params in dependencies

  const refreshData = () => setRefresh((prev) => prev + 1);

  return { data, error, loading, setLoading, setData, setError, refreshData };
};

export default useFetchDataWithPagination;
