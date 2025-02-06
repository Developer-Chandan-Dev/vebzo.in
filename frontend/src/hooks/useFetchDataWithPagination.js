import axios from "axios";
import { useEffect, useState } from "react";

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

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
        console.log(error);
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
