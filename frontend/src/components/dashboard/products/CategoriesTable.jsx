/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Plus, RefreshCwIcon, Search, X } from "lucide-react";
import CategoryBox from "./CategoryBox";
import useFetchData from "../../../hooks/useFetchData";
import { useEffect, useState } from "react";
import useFetchDataWithPagination from "../../../hooks/useFetchDataWithPagination";
import useHandleDeletewithSweetAlert from "../../../hooks/useHandleDeleteWithSweetAlert";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const CategoriesTable = ({ onEditClick }) => {
  const [categories, setCategories] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchBox, setActiveSearchBox] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading, error, refreshData } = useFetchDataWithPagination(
    `${VITE_API_URL}/api/v1/category/`,
    1,
    9,
    searchText
  );

  useEffect(()=>{
    setCategories(data?.data);
  },[data?.data])

  const handleSetSearchText = () => {
    setSearchText(searchTerm.trim());
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSetSearchText(); // Trigger the search function when Enter key is pressed
    }
  };

  const { handleDelete } = useHandleDeletewithSweetAlert();

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6 gap-2 flex-wrap relative">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-100">
            Available Category
          </h2>
          <button
            className="flex items-center gap-[6px] border border-gray-700 px-3 py-2 rounded-md hover:bg-gray-700 "
            onClick={() => onEditClick()}
          >
            <Plus className="size-5 font-bold" />
            <span className="hidden sm:block">Add New</span>
          </button>
        </div>

        <div className="">
          <button
            className="flex sm:hidden items-center gap-[6px] border border-gray-700 px-3 py-2 rounded-md hover:bg-gray-700 "
            onClick={() => setActiveSearchBox(true)}
          >
            <Search className="size-5 font-bold" />
          </button>
          <div
            className={`${
              activeSearchBox ? "flex" : "hidden"
            } sm:flex items-center justify-center absolute left-0 bg-gray-800 top-0 w-full py-3 sm:relative gap-2`}
          >
            <button
              className="w-auto px-3 gap-2 h-9 border flex-center text-gray-500 transition-all hover:text-gray-400 rounded-md border-gray-600"
              title="Refresh"
              onClick={refreshData}
            >
              <span className="hidden sm:block">Refresh</span>
              <RefreshCwIcon className="size-4" />
            </button>
            <div className="relative ">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={(e) => setSearchTerm(e.target.value)}
                value={searchTerm}
                onKeyDown={handleKeyPress}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <button
              className="flex sm:hidden items-center gap-[6px] border border-gray-700 px-3 py-2 rounded-md hover:bg-gray-700 "
              onClick={() => setActiveSearchBox(false)}
            >
              <X className="size-5 font-bold" />
            </button>
          </div>
        </div>
      </div>

      <div className=" flex items-center flex-wrap gap-4">
        {categories?.length > 0 && categories !== null
          ? categories.map((item) => (
              <CategoryBox
                key={item._id}
                _id={item._id}
                name={item.name}
                description={item.description}
                onEditClick={onEditClick}
                handleDelete={handleDelete}
                setCategories={setCategories}
                categories={categories}
              />
            ))
          : "No categories found"}
      </div>
    </motion.div>
  );
};

export default CategoriesTable;
