/* eslint-disable react/prop-types */
import "./style.css";
import { motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import { MoveLeft, MoveRight, RefreshCwIcon, Search, X } from "lucide-react";
import OrderTr from "./OrderTr";
import OrderList from "./OrderList";
import useFetchDataWithPagination from "../../../hooks/useFetchDataWithPagination";
import Spinner from "../../utility/Spinner";
import useHandleDeletewithSweetAlert from "../../../hooks/useHandleDeleteWithSweetAlert";
import useUsersTable from "../../../hooks/users/useUsersTable";
import useOrderTable from "../../../hooks/orders/useOrderTable";
import Empty from "../../utility/Empty";
import TableContainer from "../common/TableContainer";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const OrderTable = ({ onEditClick }) => {
  const [searchText, setSearchText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeList, setActiveList] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeSearchBox, setActiveSearchBox] = useState(false);
  const [orderItems, setOrderItems] = useState(null);
  const [orderId, setOrderId] = useState(false);

  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState("");
  const [checkStatusFilter, setCheckStatusFilter] = useState(false);
  const [checkPaymentStatusFilter, setCheckPaymentStatusFilter] =
    useState(false);
  const [startData, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [checkDateFilter, setCheckDateFilter] = useState(false);

  const tableContainerRef = useRef(null);

  const params = useMemo(
    () => ({
      page: currentPage,
      limit: 8,
      query: searchText.length > 0 ? searchText : "",
      status: status.length > 0 ? status : "",
      paymentStatus: paymentStatus.length > 0 ? paymentStatus : "",
    }),
    [currentPage, paymentStatus, searchText, status]
  );

  const { data, loading, refreshData } = useFetchDataWithPagination(
    `${VITE_API_URL}/api/v1/orders`,
    params
  );

  const { handlePageClick, handleEnterKeyPress } = useUsersTable({
    currentPage,
    setCurrentPage,
    searchTerm,
    setSearchText,
  });

  const {
    handleToggleStatusFilter,
    handleFilterByStatus,
    handleTogglePaymentStatusFilter,
    handleFilterByPaymentStatus,
  } = useOrderTable({
    setCurrentPage,
    checkStatusFilter,
    setStatus,
    setCheckStatusFilter,
    checkPaymentStatusFilter,
    setPaymentStatus,
    setCheckPaymentStatusFilter,
    setStartDate,
    setEndDate,
    setCheckDateFilter,
    checkDateFilter,
  });

  useEffect(() => {
    setOrderItems(data?.data);
  }, [data?.data]);
  console.log(orderItems);

  // Function to handle page change
  // Create an array of page numbers (e.g., [1, 2, 3])
  const pageNumbers = [];
  for (let i = 1; i <= data?.totalPages; i++) {
    pageNumbers.push(i);
  }

  const { handleDelete } = useHandleDeletewithSweetAlert();

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
                onKeyDown={handleEnterKeyPress}
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
      <TableContainer>
        {!activeList && !loading && (
          <table className="table-container divide-y divide-gray-700 w-[1200px] md:w-[1450px] ">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="size-4 cursor-pointer"
                    onChange={handleToggleStatusFilter}
                    checked={checkStatusFilter}
                  />
                  <span>Order Id</span>
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Customer Name
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Grand Total
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1">
                  <input
                    type="checkbox"
                    className="size-4 cursor-pointer"
                    onChange={handleToggleStatusFilter}
                    checked={checkStatusFilter}
                  />
                  {!checkStatusFilter && <span>Status</span>}

                  {checkStatusFilter && (
                    <select
                      className="bg-gray-700 px-1 outline-gray-500 py-1 rounded-md text-[14px]"
                      value={status}
                      onChange={handleFilterByStatus}
                    >
                      <option value="">Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Out for Delivery">OFD</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  )}
                </th>
                <th className="px-4 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  <input
                    type="checkbox"
                    className="size-4 cursor-pointer ml-1"
                    onChange={handleTogglePaymentStatusFilter}
                    checked={checkPaymentStatusFilter}
                  />
                  {!checkPaymentStatusFilter && (
                    <span className="ml-1">Payment Status</span>
                  )}

                  {checkPaymentStatusFilter && (
                    <select
                      className="bg-gray-700 px-1 outline-gray-500 py-1 mr-1 rounded-md text-[14px]"
                      value={paymentStatus}
                      onChange={handleFilterByPaymentStatus}
                    >
                      <option value="">Payment Status</option>
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Failed">Failed</option>
                    </select>
                  )}
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-300 uppercase tracking-wider flex items-center gap-2">
                  <input type="checkbox" className="size-4 cursor-pointer" />
                  {!checkDateFilter && <span>Order Date</span>}
                  {checkDateFilter && (
                    <div>
                      <input
                        type="date"
                        className="text-gray-300 rounded-md border border-gray-500 px-1 py-1 bg-gray-600 mb-1"
                      />
                      <input
                        type="date"
                        className="text-gray-300 rounded-md border border-gray-500 px-1 py-1 bg-gray-600"
                      />
                    </div>
                  )}
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Delivery Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {orderItems !== null && orderItems?.length > 0 ? (
                orderItems.map((order, index) => (
                  <OrderTr
                    key={index}
                    _id={order?._id}
                    orderId={order?.orderId}
                    username={order?.user?.username}
                    firstname={order?.firstname}
                    lastname={order?.lastname}
                    orderItems={order?.orderItems}
                    shippingAddress={order?.shippingAddress}
                    totalPrice={order?.grandTotal}
                    paymentMethod={order?.paymentMethod}
                    paymentStatus={order?.paymentStatus}
                    deliveredAt={order?.deliveredAt}
                    status={order?.status}
                    createdAt={order?.createdAt}
                    onEditClick={onEditClick}
                    handleDelete={handleDelete}
                    setOrderItems={setOrderItems}
                    orderItems2={orderItems}
                  />
                ))
              ) : (
                <tr className="text-center">
                  <Empty />
                </tr>
              )}
            </tbody>
          </table>
        )}
        {activeList && !loading && orderItems?.length > 0 && orderItems !== null
          ? orderItems.map((order, index) => (
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
                grandTotal={order?.grandTotal}
                deliveryCharge={order?.deliveryCharge}
                createdAt={order?.createdAt}
                onEditClick={onEditClick}
                handleDelete={handleDelete}
                setOrderItems={setOrderItems}
                orderItems2={orderItems}
              />
            ))
          : ""}
      </TableContainer>

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

export default OrderTable;
