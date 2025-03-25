/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import useHandleSendingRequest from "../../../hooks/useHandleSendingRequest";
import { toast } from "react-toastify";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const AddUpdateCategoriesPopup = ({ category, onClose }) => {
  const [name, setName] = useState(category?.name || "");
  const [description, setDescription] = useState(category?.description || "");
  const [newCategoryId, setNewCategoryId] = useState("");
  const [loading, setLoading] = useState(false);

  const { handleSubmit } = useHandleSendingRequest();

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await handleSubmit(
      category ? "PUT" : "POST",
      category
        ? `${VITE_API_URL}/api/v1/category/${category._id}`
        : `${VITE_API_URL}/api/v1/category`,
      {
        name,
        description,
      }
    );
    if (response.success === true) {
      toast.success(response.message);
      setNewCategoryId(response?.data._id);
      setName("");
      setDescription("");
      setLoading(false);
    } else {
      toast.error(response.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);
  return (
    <motion.div
      className="fixed flex-center left-0 top-0 w-full h-full z-10 drop-shadow text-slate-500 backdrop-filter backdrop-blur-sm bg-opacity-5 "
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className=" w-11/12  sm:w-[600px] md:w-[800px] px-6 py-4 h-auto bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-600 mb-6">
        <div className="">
          <div className=" flex items-center justify-between">
            <h1 className="text-white">
              {category ? "Update Category Details" : "Add New Category"}
            </h1>
            <div className="py-1 flex-center transition-all rounded-md hover:bg-red-500 w-7 cursor-pointer hover:text-white">
              <X size={18} className="" onClick={onClose} />
            </div>
          </div>
          <form className="px-1 py-2 sm:p-5 text-slate-100" onSubmit={onSubmit}>
            <div>
              <label htmlFor="name" className="ml-1">
                Product Name
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <input
                  type="text"
                  id="name"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                  className="w-full sm:w-80 h-9 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                  placeholder="Enter Product Name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="ml-1">
                Product Description
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <textarea
                  type="text"
                  id="description"
                  value={description}
                  required
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full h-28 resize-none py-2 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                  placeholder="Enter Product Name"
                />
              </div>
            </div>

            <div>
              <button
                className="px-6 rounded-md py-2 border text-slate-100 border-slate-500 font-semibold transition-all hover:text-white hover:bg-slate-700 hover:shadow-md shadow-slate-300"
                type="submit"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default AddUpdateCategoriesPopup;
