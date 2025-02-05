/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Filter, MoveLeft, MoveRight, Search, Star } from "lucide-react";
import { useState } from "react";
import ItemBox from "./ItemBox";
import useFetchData from "../../../hooks/useFetchData";
import useFetchDataWithPagination from "../../../hooks/useFetchDataWithPagination";
import Spinner from "../../utility/Spinner";

const Container = ({
  toggleSidebar,
  setToggleSidebar,
  searchText = "",
  setSearchText,
  minPrice,
  maxPrice,
  toggleFilter,
  setToggleFilter,
}) => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("");

  const { data, error, loading } = useFetchDataWithPagination(
    `${VITE_API_URL}/api/v1/products`,
    currentPage,
    9,
    searchText.length > 0 ? searchText : "",
    sortBy,
    toggleFilter ? minPrice : "",
    toggleFilter ? maxPrice : ""
  );

  // Function to handle page change
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  // Create an array of page numbers (e.g., [1, 2, 3])
  const pageNumbers = [];
  for (let i = 1; i <= data?.totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="w-full md:w-[800px] h-auto text-left">
      <div className="flex-between">
        <h1 className="text-4xl font-semibold py-3 text-[#8bc34a]">Shop</h1>
        <div className="flex md:hidden items-center gap-3">
          <div
            className="w-9 h-9 rounded-md border flex-center cursor-pointer text-gray-500 opacity-50 hover:opacity-100"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <Search size={20} />
          </div>
          <div
            className="w-9 h-9 rounded-md border flex-center cursor-pointer text-gray-500  opacity-50 hover:opacity-100"
            onClick={() => setToggleSidebar(!toggleSidebar)}
          >
            <Filter size={20} />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <p>
          Showing 1 - {data?.totalPages} of {data?.totalProducts} results
        </p>
        <select
          name="filter"
          id="sortBy"
          className="px-2 py-1 outline-gray-300 rounded border border-gray-300"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="">Default Sorting</option>
          <option value="popularity">Sort by populatiry</option>
          <option value="average-rating">Sort by average rating</option>
          <option value="latest">Sort by latest</option>
          <option value="oldest">Sort by oldest</option>
          <option value="price-asc">Sort by Price : low to high</option>
          <option value="price-desc">Sort by Price : high to low</option>
          <option value="name-asc">Sort by Name : (A-Z)</option>
          <option value="name-desc">Sort by Name : (Z-A)</option>
        </select>
      </div>

      <div className="flex items-center flex-wrap gap-5 my-14 ">
        {loading && (
          <div className="w-full h-64 flex-center">
            <Spinner />
          </div>
        )}

        {!loading && data?.data.length > 0 && data?.data !== null
          ? data?.data.map((item, index) => (
              <ItemBox
                key={index}
                _id={item?._id}
                name={item?.name}
                category={item?.category?.name}
                price={item?.price}
                imageUrl={item?.imageUrl}
                rating={item.rating}
              />
            ))
          : ""}
      </div>
      <div className="flex items-center gap-3">
        <button
          className={`w-10 h-10 border border-[#8bc34a] text-[#8bc34a] font-semibold text-base transition-all hover:bg-[#8bc34a] hover:text-white ${
            currentPage > 1 ? "flex-center" : "hidden"
          }`}
          onClick={() => setCurrentPage(currentPage > 1 && currentPage - 1)}
        >
          <MoveLeft size="16" />
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            className={`w-10 h-10 border border-[#8bc34a]  font-semibold text-base transition-all hover:bg-[#8bc34a] hover:text-white ${
              page === currentPage
                ? "bg-[#8bc34a] text-white"
                : "text-[#8bc34a]"
            }`}
            onClick={() => handlePageClick(page)}
          >
            {page}
          </button>
        ))}

        <button
          className={`w-10 h-10 border border-[#8bc34a] text-[#8bc34a] font-semibold text-base transition-all hover:bg-[#8bc34a] hover:text-white ${
            currentPage < pageNumbers.length ? "flex-center" : "hidden"
          }`}
          onClick={() =>
            setCurrentPage(currentPage < pageNumbers.length && currentPage + 1)
          }
        >
          <MoveRight size="16" />
        </button>
      </div>
    </div>
  );
};

export default Container;
