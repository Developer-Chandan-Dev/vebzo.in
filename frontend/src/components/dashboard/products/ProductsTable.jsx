/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import {
  Search,
  Plus,
  X,
  MoveLeft,
  MoveRight,
  RefreshCwIcon,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import ProductTr from "./ProductTr";
import useFetchDataWithPagination from "../../../hooks/useFetchDataWithPagination";
import SearchBox from "../../utility/SearchBox";
import Spinner from "../../utility/Spinner";
import useHandleDeletewithSweetAlert from "../../../hooks/useHandleDeleteWithSweetAlert";
import TableContainer from "../common/TableContainer";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const ProductsTable = ({ onEditClick }) => {
  const [productData, setProductData] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeSearchBox, setActiveSearchBox] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");
  const [category, setCategory] = useState(null);

  const params = useMemo(
    () => ({
      page: currentPage,
      limit: 8,
      query: searchText.length > 0 ? searchText : "",
      sortBy: sortBy,
      category: category
    }),
    [currentPage, searchText, sortBy, category]
  );

  const { data, loading, error, refreshData } = useFetchDataWithPagination(
    `${VITE_API_URL}/api/v1/products`,
    params
  );

  useEffect(() => {
    setProductData(data?.data);
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

  console.log(productData);
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      {/* <SearchBox/> */}
      <div className="flex justify-between items-center mb-6 gap-2 flex-wrap relative">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
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
        <TableContainer>
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Purchase Price
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Sales Price
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Stock
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Sold
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  View
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Total Revenue
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Total Profit
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {productData?.length > 0 && productData !== null
                ? productData.map(
                    ({
                      _id,
                      name,
                      imageUrl,
                      category,
                      purchasePrice,
                      price,
                      salesPrice,
                      description,
                      stock,
                      sold,
                      views,
                      isFeatured
                    }) => (
                      <ProductTr
                        key={_id}
                        _id={_id}
                        name={name}
                        imageUrl={imageUrl}
                        category={category?.name}
                        categoryId={category?._id}
                        purchasePrice={purchasePrice}
                        price={price}
                        salesPrice={salesPrice}
                        description={description}
                        stock={stock}
                        sold={sold}
                        view={views}
                        refreshData={refreshData}
                        onEditClick={onEditClick}
                        handleDelete={handleDelete}
                        setProductData={setProductData}
                        productData={productData}
                        isFeatured={isFeatured
                        }
                      />
                    )
                  )
                : ""}
            </tbody>
          </table>
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
                  page === currentPage
                    ? "bg-gray-700 text-white"
                    : "text-gray-400"
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
                setCurrentPage(
                  currentPage < pageNumbers.length && currentPage + 1
                )
              }
            >
              <MoveRight size="16" />
            </button>
          </div>
        </TableContainer>
      )}
    </motion.div>
  );
};

export default ProductsTable;
