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

  console.log(sortBy);

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
            maxPrice: maxPrice
          },
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
        setError(error.response.data.error);
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, itemsPerPage, maxPrice, minPrice, searchTerm, sortBy, url]);

  return { data, error, loading, setLoading, setData, setError };
};

export default useFetchDataWithPagination;
