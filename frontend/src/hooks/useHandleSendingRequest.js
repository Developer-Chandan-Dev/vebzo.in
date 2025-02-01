import axios from "axios";
import { useState } from "react";

const useHandleSendingRequest = (initialState) => {
  const [formData, setFormData] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (method, url, formData, bool) => {
    setLoading(true);
    setError(null);

    console.log(method, url, formData);
    try {
      const response = await axios({
        method: method, // 'POST' or 'PUT'
        url: url, // The API endpoint
        data: formData, //
        withCredentials: true,
        headers: {
          // "Content-Type": "application/json",
          "Content-Type":
            bool ? "multipart/form-data" : "application/json",
        },
      });

      setLoading(false);
      setFormData(initialState);
      return response.data;
    } catch (error) {
      console.log(error);
      setLoading(false);
      setError(error.response?.data?.message || "Something went wrong");
      return error.response?.data?.message || "Something went wrong";
    }
  };

  const resetForm = () => {
    setFormData(initialState);
    // toast.success("Form reseted successfully");
  };

  return {
    loading,
    setLoading,
    error,
    setError,
    formData,
    setFormData,
    handleChange,
    handleSubmit,
    resetForm,
  };
};

export default useHandleSendingRequest;
