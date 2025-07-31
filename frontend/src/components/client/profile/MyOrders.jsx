/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import {
  Image,
  RefreshCwIcon,
  Search,
  TrainTrack,
  X,
  XCircle,
} from "lucide-react";
import { formatDate, formatDateTime } from "../../../utils/dateUtils";
import Button from "../../utility/Button";
import Spinner from "../../utility/Spinner";
import OrderTrackingPopup from "./OrderTrackingPopup";
import Empty from "../../utility/Empty";
import useMyOrders from "../../../hooks/client/useMyOrders";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const MyOrders = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchText, setSearchText] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const params = useMemo(
    () => ({
      // page: currentPage,
      // limit: 9,
      query: searchText.length > 0 ? searchText : "",
    }),
    [searchText]
  );
  
  // Custom hook to manage orders
  const {
    myOrders,
    refetch,
    setMyOrders,
    isOpen,
    handleStatusChange,
    setIsOpen,
    order_id,
    handleDelete,
    togglePopup,
    handlePopupOpen,
    isLoading,
    error,
    isUpdating,
    isDeleting,
  } = useMyOrders(params);


  const handleSetSearchText = () => {
    setSearchText(searchTerm.trim());
    setCurrentPage(1);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      handleSetSearchText(); // Trigger the search function when Enter key is pressed
    }
  };

  useEffect(() => {
    if (searchTerm === "" || searchTerm === null) {
      handleSetSearchText();
    }
  }, [setSearchText, searchTerm]);

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      handleSetSearchText(); // Trigger the search function when Enter key is pressed
    }
  };

  return (
    <div className="w-full px-4 h-auto py-5 relative">
      <div className="flex items-center gap-2 mb-5 justify-between flex-wrap">
        <h1 className="text-3xl font-semibold ml-2 ">My Orders</h1>
        <div className="relative ">
          <input
            type="text"
            placeholder="Search by order Id..."
            className="border bg-gray-50 text-gray-800 placeholder-gray-400 rounded-lg pl-4 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-gray-300"
            onChange={(e) => setSearchTerm(e.target.value)}
            value={searchTerm}
            onKeyDown={handleEnterKeyPress}
          />
          <Search
            className="absolute right-3 cursor-pointer top-2.5 text-gray-400 hover:text-gray-500"
            size={18}
            onClick={handleSearch}
          />
        </div>
        <button
          className="w-auto px-3 gap-2 h-9 border flex-center text-gray-700 transition-all hover:text-gray-400 rounded-md border-gray-400"
          title="Refresh"
          onClick={() => refetch()}
        >
          <span className="hidden sm:block">Refresh</span>
          <RefreshCwIcon className="size-4" />
        </button>
      </div>
      {isLoading && (
        <div className="w-full h-64 flex-center">
          <Spinner />
        </div>
      )}

      {!isLoading && error && (
        <div className="w-full px-3 py-2 text-red-500">{error}</div>
      )}
      {isOpen && (
        <OrderTrackingPopup
          isOpen={isOpen}
          togglePopup={togglePopup}
          setIsOpen={setIsOpen}
          order_id={order_id}
        />
      )}

      {!isLoading && error && (
        <p className="text-3xl font-bold text-red-500 ml-10 mt-10">
          Error : {error}
        </p>
      )}
      {!isLoading && myOrders?.length == 0 && (
        <p className="text-3xl font-bold text-blue-500 ml-10 mt-10">
          Not Found!
        </p>
      )}

      <div className="w-full mt-5 h-auto">
        {!isLoading &&
          myOrders?.length > 0 &&
          myOrders !== null &&
          myOrders.map((item, index) => (
            <div
              key={index}
              className=" bg-[#f8f6f3] px-5 py-5 drop-shadow-md mb-7 rounded-md"
            >
              <div className="flex items-center justify-between pb-3 gap-3 flex-wrap">
                <div className="flex items-center gap-3 flex-wrap">
                  <button className="px-4 bg-slate-100 font-semibold py-2 rounded-full border">
                    Order <span className="text-blue-500">{item?.orderId}</span>
                  </button>
                  <p className="ml-3">
                    Order Place: {formatDate(item?.createdAt)}
                  </p>
                </div>
                <div>
                  {item.status === "Delivered" ? (
                    <XCircle
                      className="ml-3 opacity-50 hover:opacity-90 cursor-pointer"
                      onClick={() => handleDelete(item?._id)}
                      disabled={isDeleting}
                    />
                  ) : (
                    <Button
                      label="TRACK ORDER"
                      LeftIcon={TrainTrack}
                      onClick={() => handlePopupOpen(item?._id)}
                    />
                  )}
                </div>
              </div>
              <div className="py-3">
                <div className="w-full px-2 pt-5 pb-3 flex items-start justify-between gap-5 flex-wrap border-t">
                  <div>
                    {item?.orderItems.length > 0 && item?.orderItems !== null
                      ? item?.orderItems.map((subItem, index) => (
                          <>
                            <div
                              key={subItem?._id}
                              className="flex items-start flex-wrap gap-3 mb-4"
                            >
                              {subItem?.product?.imageUrl ? (
                                <Link to={`/shop/${subItem?.product?._id}`}>
                                  <img
                                    src={subItem?.product?.imageUrl}
                                    className="w-24 h-24 bg-white border"
                                    alt="Product Image"
                                  />
                                </Link>
                              ) : (
                                <Image className="w-24 h-24 bg-white text-gray-400 border" />
                              )}
                              <div>
                                <Link to={`/shop/${subItem?.product?._id}`}>
                                  <h3>{subItem?.product?.name}</h3>
                                </Link>
                                <p>
                                  By: {item?.firstname} {item?.lastname}
                                </p>
                                <p className="mt-3">
                                  Qty : {subItem?.quantity} , Price :{" "}
                                  {subItem?.price}
                                </p>
                                <p>
                                  <b>
                                    Total : .{" "}
                                    {subItem?.quantity * subItem?.price}
                                  </b>
                                </p>
                              </div>
                            </div>
                          </>
                        ))
                      : ""}
                  </div>
                  <div>
                    <p>
                      Status :{" "}
                      <span className="font-semibold text-orange-400">
                        {item?.status}
                      </span>
                    </p>
                    {/* <p className="text-lg font-semibold text-orange-400">Pending</p> */}
                  </div>
                  <div>
                    <p>Delivery Expected By:</p>
                    <p>
                      <b>{formatDateTime(item?.deliveredAt)}</b>
                    </p>
                    <div className="mt-3">
                      <p>
                        <span className="font-semibold">Total</span> : Rs.{" "}
                        {item?.totalPrice}
                      </p>
                      <p>
                        <span className="font-semibold">Delivery Charge</span> :{" "}
                        Rs. {item?.deliveryCharge}
                      </p>
                      <p>
                        <span className="font-semibold">Grand Total</span> : Rs.{" "}
                        {parseInt(item?.deliveryCharge) +
                          parseInt(item?.totalPrice)}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="w-full mt-5 pt-4 border-t flex items-center justify-between flex-wrap gap-3">
                  {item?.status === "Delivered" ? (
                    <p className="bg-[#6a9739] px-2 py-1 rounded-md text-white font-semibold">
                      Order Delivered
                    </p>
                  ) : (
                    <Button
                      label={
                        item?.status === "Cancelled"
                          ? "RESUME ORDER"
                          : "CANCEL ORDER"
                      }
                      sm={true}
                      LeftIcon={X}
                      onClick={() =>
                        handleStatusChange(
                          item?._id,
                          item?.status === "Cancelled" ? "Pending" : "Cancelled"
                        )
                      }
                      disabled={isUpdating}
                    />
                  )}

                  <p>
                    <b>
                      Rs.{" "}
                      {parseInt(item?.deliveryCharge) +
                        parseInt(item?.totalPrice)}
                      .00
                    </b>
                  </p>
                </div>
              </div>
            </div>
          ))}
        {error && !isLoading && myOrders?.length < 0 && <Empty />}
      </div>
    </div>
  );
};

export default MyOrders;
