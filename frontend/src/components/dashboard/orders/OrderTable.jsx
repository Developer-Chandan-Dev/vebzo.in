/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { useState } from "react";
import { MoveLeft, MoveRight, Search } from "lucide-react";
import OrderTr from "./OrderTr";
import OrderList from "./OrderList";
import useFetchDataWithPagination from "../../../hooks/useFetchDataWithPagination";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const OrderTable = ({ onEditClick }) => {
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeList, setActiveList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { data, loading } = useFetchDataWithPagination(
    `${VITE_API_URL}/api/v1/orders`,
    currentPage,
    8,
    searchText
  );
  console.log(data, loading);

  // Function to handle page change
  const handlePageClick = (page) => {
    setCurrentPage(page);
  };

  const handleSetSearchText = () => {
    setSearchText(searchTerm.trim());
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSetSearchText(); // Trigger the search function when Enter key is pressed
    }
  };

  // Create an array of page numbers (e.g., [1, 2, 3])
  const pageNumbers = [];
  for (let i = 1; i <= data?.totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6 my-7"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="w-full pt-2 pb-4 flex-center gap-2">
        <button
          className={`px-4 py-2 border transition-all hover:bg-gray-600 border-gray-600 rounded-md ${
            !activeList && "bg-gray-600"
          } `}
          onClick={() => setActiveList(false)}
        >
          Order Table
        </button>
        <button
          className={`px-4 py-2 border transition-all hover:bg-gray-600 border-gray-600 rounded-md ${
            activeList && "bg-gray-600"
          } `}
          onClick={() => setActiveList(true)}
        >
          Order List
        </button>
      </div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-100">
          {activeList ? "Order List" : "Order Table"}
        </h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search orders..."
            className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            onKeyDown={handleKeyPress}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto gap-5 flex-center flex-col">
        {!activeList && (
          <table className="min-w-full divide-y divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Order Id
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Total
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Payment Status
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {data?.data !== null && data?.data.length > 0
                ? data?.data.map((order, index) => (
                    <OrderTr
                      key={index}
                      _id={order?._id}
                      orderId={order?.orderId}
                      username={order?.user?.username}
                      firstname={order?.firstname}
                      lastname={order?.lastname}
                      orderItems={order?.orderItems}
                      shippingAddress={order?.shippingAddress}
                      totalPrice={order?.totalPrice}
                      paymentMethod={order?.paymentMethod}
                      paymentStatus={order?.paymentStatus}
                      deliveredAt={order?.deliveredAt}
                      status={order?.status}
                      createdAt={order?.createdAt}
                      onEditClick={onEditClick}
                    />
                  ))
                : "Nothing found"}
            </tbody>
          </table>
        )}

        {activeList && data?.data.length > 0 && data?.data !== null
          ? data?.data.map((order, index) => (
              <OrderList
                key={index}
                _id={order?._id}
                orderId={order?.orderId}
                username={order?.user?.username}
                firstname={order?.firstname}
                lastname={order?.lastname}
                orderItems={order?.orderItems}
                shippingAddress={order?.shippingAddress}
                totalPrice={order?.totalPrice}
                paymentMethod={order?.paymentMethod}
                paymentStatus={order?.paymentStatus}
                deliveredAt={order?.deliveredAt}
                status={order?.status}
                createdAt={order?.createdAt}
                onEditClick={onEditClick}
              />
            ))
          : ""}

        <div className="px-5 py-2 flex items-center w-full gap-3 mt-5">
          <button
            className={`w-10 h-10 border border-gray-600 text-gray-400 font-semibold text-base transition-all hover:bg-gray-700 hover:text-white ${
              currentPage > 1 ? "flex-center" : "hidden"
            }`}
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
      </div>
    </motion.div>
  );
};

export default OrderTable;
