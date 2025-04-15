/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { X, XCircle, CheckCircle2 } from "lucide-react";
import { useRef } from "react";
import useFetchData from "../../../hooks/useFetchData";
import Spinner from "../../utility/Spinner";
import { useState } from "react";
import { useEffect } from "react";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const OrderTrackingPopup = ({ togglePopup, isOpen, order_id, setIsOpen }) => {
  const [status, setStatus] = useState("Pending");
  const popupRef = useRef();

  const { data, loading, error } = useFetchData(
    `${VITE_API_URL}/api/v1/orders/my-orders/order-status/${order_id}`
  );

  useEffect(() => {
    setStatus(data?.order?.status || "Pending");
  }, [data?.order?.status]);

  const popupVariants = {
    open: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    closed: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const handlePopupClose = ()=>{
    setIsOpen(false)
    // refreshData();
  }

  return (
    <motion.div
      className="fixed flex-center left-0 top-0 w-full h-full z-50 drop-shadow bg-black text-slate-700 backdrop-filter backdrop-blur-sm bg-opacity-10 "
      ref={popupRef}
      initial="closed"
      animate={"open"}
      exit="closed"
      variants={popupVariants}
    >
      <div className=" w-11/12  sm:w-[400px] md:w-[80] px-6 py-4 h-96 sm:h-[400px] bg-white backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-200 mb-6">
        <div className=" flex items-center justify-between">
          <h1 className="text-gray-700">Order Status</h1>
          <div className="py-1 flex-center transition-all rounded-md hover:bg-red-500 w-7 cursor-pointer hover:text-white">
            <X size={18} className="" onClick={handlePopupClose} />
          </div>
        </div>

        <div className="w-72 py-10 px-10 h-auto mx-auto mt-5">
          {loading ? (
            <Spinner />
          ) : (
            <ul className="flex-center flex-col gap-5">
              {status !== "Cancelled" ? (
                <>
                  <li
                    className={`flex items-center gap-2 bg-slate-50 px-6 py-2 drop-shadow ${
                      status === "Pending" ||
                      status === "Confirmed" ||
                      status === "Out for Delivery" ||
                      status === "Delivered"
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    <span>Pending</span> <CheckCircle2 />
                  </li>
                  <li
                    className={`flex items-center gap-2 bg-slate-50 px-6 py-2 drop-shadow ${
                      status === "Confirmed" ||
                      status === "Out for Delivery" ||
                      status === "Delivered"
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    <span>Confirmed </span>
                    {status === "Confirmed" ||
                    status === "Out for Delivery" ||
                    status === "Delivered" ? (
                      <CheckCircle2 />
                    ) : (
                      <XCircle />
                    )}
                  </li>
                  <li
                    className={`flex items-center gap-2 bg-slate-50 px-6 py-2 drop-shadow ${
                      status === "Out for Delivery" || status === "Delivered"
                        ? "text-green-500"
                        : ""
                    }`}
                  >
                    <span>Out For Delivery </span>
                    {status === "Out for Delivery" || status === "Delivered" ? (
                      <CheckCircle2 />
                    ) : (
                      <XCircle />
                    )}
                  </li>
                  <li
                    className={`flex items-center gap-2 bg-slate-50 px-6 py-2 drop-shadow ${
                      status === "Delivered" ? "text-green-500" : ""
                    }`}
                  >
                    <span>Delivered </span>
                    {status === "Delivered" ? <CheckCircle2 /> : <XCircle />}
                  </li>
                </>
              ) : (
                <li
                  className={`flex items-center gap-2 bg-slate-50 px-6 py-2 drop-shadow ${
                    status === "Cancelled" ? "text-red-500" : ""
                  }`}
                >
                  <span>Cancelled</span>
                  {status === "Cancelled" && <XCircle />}
                </li>
              )}
            </ul>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default OrderTrackingPopup;
