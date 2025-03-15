/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import {
  MoveLeft,
  MoveRight,
  Plus,
  RefreshCwIcon,
  Search,
  X,
} from "lucide-react";
import CategoryBox from "./CategoryBox";
import { useEffect, useMemo, useState } from "react";
import useFetchDataWithPagination from "../../../hooks/useFetchDataWithPagination";
import useHandleDeletewithSweetAlert from "../../../hooks/useHandleDeleteWithSweetAlert";
import Spinner from "../../utility/Spinner";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const CategoriesTable = ({ onEditClick }) => {
  const [categories, setCategories] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchBox, setActiveSearchBox] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const params = useMemo(
    () => ({
      page: currentPage,
      limit: 6,
      query: searchText.length > 0 ? searchText : "",
    }),
    [currentPage, searchText]
  );

  const { data, loading, error, refreshData } = useFetchDataWithPagination(
    `${VITE_API_URL}/api/v1/category/`,
    params
  );
  console.log(error);
  
  useEffect(() => {
    setCategories(data?.data);
  }, [data?.data]);

  const handleSetSearchText = () => {
    setSearchText(searchTerm.trim());
    setCurrentPage(1);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSetSearchText(); // Trigger the search function when Enter key is pressed
    }
  };

  useEffect(() => {
    if (searchTerm === "" || searchTerm === null) {
      handleSetSearchText();
    }
  }, [setSearchText, searchTerm]);

  // Function to handle page change
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const { handleDelete } = useHandleDeletewithSweetAlert();

  // Create an array of page numbers (e.g., [1, 2, 3])
  const pageNumbers = [];
  for (let i = 1; i <= data?.totalPages; i++) {
    pageNumbers.push(i);
  }

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
      {loading && (
        <div className="w-full h-72 flex-center">
          <Spinner />
        </div>
      )}
      {!loading && (
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
      )}
      <div className="px-5 py-2 flex items-center w-full gap-3 mt-5">
        <button
          className={`w-10 h-10 border border-gray-600 text-gray-400 font-semibold text-base transition-all hover:bg-gray-700 hover:text-white flex-center `}
          disabled={currentPage > 1 && currentPage - 1}
          onClick={() => setCurrentPage(currentPage > 1 && currentPage - 1)}
        >
          <MoveLeft size="16" />
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`w-10 h-10 border border-gray-600 text-gray-400 font-semibold text-base transition-all hover:bg-gray-700 hover:text-white ${
              page === currentPage ? "bg-gray-700 text-white" : "text-gray-400"
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`w-10 h-10 border border-gray-600 text-gray-400 font-semibold text-base transition-all hover:bg-gray-700 hover:text-white ${
            currentPage < pageNumbers.length ? "flex-center" : "hidden"
          }`}
          onClick={() =>
            setCurrentPage(currentPage < pageNumbers.length && currentPage + 1)
          }
        >
          <MoveRight size="16" />
        </button>
      </div>
    </motion.div>
  );
};

export default CategoriesTable;
