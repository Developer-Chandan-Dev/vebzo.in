/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import axios from "axios";

/**
 * A React hook that fetches the data from a given url and stores it in the state
 * @param {string} url The url from which to fetch the data
 * @returns {object} An object with the state variables and functions to set them
 */
const useFetchData = (url) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [refresh, setRefresh] = useState(0); // Add a state to trigger re-fetch

  /**
   * This function fetches the data from the given url and stores it in the state
   * It also handles errors if the request fails
   */

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(url); // Waiting for get requests
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
      console.error(error.response.data.error);
      setError(error.response.data.error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch data initially and on refresh state change
  }, [url, refresh]);

  const refreshData = () => setRefresh((prev) => prev + 1); // Increment to trigger re-fetch

  /**
   * The variables and functions returned by the hook
   * @returns {object} An object with the state variables and functions to set them
   */
  return { loading, error, data, setData, setLoading, setError, refreshData };
};

export default useFetchData;
