/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { X } from "lucide-react";
import useHandleSendingRequest from "../../../hooks/useHandleSendingRequest";
import useFetchData from "../../../hooks/useFetchData";
import { formatDateForDatetimeLocal } from "../../../utils/dateUtils";
import SmallSpinner from "../../utility/SmallSpinner";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const AddUpdateOrdersPopup = ({ order, onClose, refreshData }) => {
  const [orderId, setOrderId] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [status, setStatus] = useState("Pending");
  const [paymentStatus, setPaymentStatus] = useState("Pending");
  const [deliveredAt, setDeliveredAt] = useState("");
  const [phone, setPhone] = useState("");
  const [village, setVillage] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [isLoading, seIsLoading] = useState(false);

  const { data, loading, error } = useFetchData(
    `${VITE_API_URL}/api/v1/orders/details/${order?._id}`
  );

  useEffect(() => {
    setOrderId(data?.data?.orderId);
    setTotalPrice(data?.data?.totalPrice);
    setStatus(data?.data?.status);
    setPaymentStatus(data?.data?.paymentStatus);
    setDeliveredAt(data?.data?.deliveredAt || "");
    setPhone(data?.data?.shippingAddress?.phone);
    setVillage(data?.data?.shippingAddress?.village);
    setCity(data?.data?.shippingAddress?.city);
    setAddress(data?.data?.shippingAddress?.address);
  }, [data?.data]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const { handleSubmit } = useHandleSendingRequest();

  const handleStatusUpdate = async (e) => {
    const response = await handleSubmit(
      "PUT",
      `${VITE_API_URL}/api/v1/orders/${order?._id}/status`,
      {
        status: e.target.value,
      }
    );
    if (response.success === true) {
      setStatus(response?.status);
      toast.success("Status Updated Successfully");
    } else {
      console.log(response);
    }
  };

  const handlePaymentStatusUpdate = async (e) => {
    const response = await handleSubmit(
      "PUT",
      `${VITE_API_URL}/api/v1/orders/${order?._id}/payment-status`,
      {
        paymentStatus: e.target.value,
      }
    );
    if (response.success === true) {
      setPaymentStatus(response?.paymentStatus);
      toast.success("Payment Status Updated Successfully");
    } else {
      console.log(response);
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    seIsLoading(true);

    try {
      const res = await handleSubmit(
        "PUT",
        `${VITE_API_URL}/api/v1/orders/${order?._id}`,
        {
          status,
          paymentStatus,
          deliveredAt,
          shippingAddress: {
            phone,
            village,
            city,
            address,
          },
        }
      );

      console.log(res);
      if (res.success === true) {
        toast.success(res?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error || "Something went wrong");
    } finally {
      seIsLoading(false);
    }
  };

  return (
    <motion.div
      className="fixed flex-center left-0 top-0 w-full h-full z-10 drop-shadow text-slate-500 backdrop-filter backdrop-blur-sm bg-opacity-5 "
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className=" w-11/12  sm:w-[600px] md:w-[800px] px-6 py-4 h-auto bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-600 mb-6">
        <div className=" flex items-center justify-between">
          <h1 className="text-white">
            {order ? "Update Order Details" : "Add New Order"}
          </h1>
          <div className="py-1 flex-center transition-all rounded-md hover:bg-red-500 w-7 cursor-pointer hover:text-white">
            <X size={18} className="" onClick={onClose} />
          </div>
        </div>
        <form className="px-1 py-2 sm:p-5 text-slate-100" onSubmit={onSubmit}>
          <div>
            <h3 className="ml-1 my-3 text-lg">
              Order ID : <span className="text-red-400">{orderId}</span>
            </h3>
          </div>

          <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
            <div>
              <label htmlFor="category" className="ml-1">
                Status
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <select
                  id="category"
                  value={status}
                  required
                  onChange={handleStatusUpdate}
                  className="w-full sm:w-80 h-10 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="category" className="ml-1">
                Payment Status
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <select
                  id="category"
                  value={paymentStatus}
                  required
                  onChange={handlePaymentStatusUpdate}
                  className="w-full sm:w-80 h-10 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                >
                  <option value="Pending">Pending</option>
                  <option value="Paid">Paid</option>
                  <option value="Failed">Failed</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
            <div>
              <label htmlFor="village" className="ml-1">
                Village
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <select
                  id="village"
                  value={village}
                  required
                  onChange={(e) => setVillage(e.target.value)}
                  className="w-full sm:w-80 h-10 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                >
                  <option value="">Choose a village</option>
                  <option value="Bhogwara">Bhogwara</option>
                  <option value="Udagi">Udagi</option>
                  <option value="Savdih">Savdih</option>
                  <option value="Belhabandh (Kwajgi patti)">Savdih</option>
                  <option value="Nevada">Nevada</option>
                  <option value="Bhorai Ka Pura">Bhorai Ka Pura</option>
                  <option value="Sarai Hariram">Sarai Hariram</option>
                </select>
              </div>
            </div>
            <div>
              <label htmlFor="category" className="ml-1">
                City
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <select
                  id="category"
                  value={city}
                  required
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full sm:w-80 h-10 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                >
                  <option value="Prayagraj">Prayagraj</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <textarea
              className="w-11/12 h-20 py-2 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
              name=""
              id=""
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            ></textarea>
          </div>
          <div className="flex items-center gap-4">
            <div>
              <label htmlFor="name" className="ml-1">
                Phone
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <input
                  type="text"
                  id="name"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full sm:w-60 h-10 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                  placeholder="Enter Product Name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="datetime" className="ml-1">
                Expected Delivery Date
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <input
                  type="datetime-local"
                  id="datetime"
                  required
                  value={formatDateForDatetimeLocal(deliveredAt)}
                  onChange={(e) => setDeliveredAt(e.target.value)}
                  className="w-full sm:w-60 h-10 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                  placeholder="Enter Product Name"
                />
              </div>
            </div>
          </div>

          <div className="mt-2">
            <button
              className="px-6 rounded-md py-2 border text-slate-100 border-slate-500 font-semibold transition-all hover:text-white hover:bg-slate-700 hover:shadow-md shadow-slate-300"
              type="submit"
            >
              {isLoading ? <SmallSpinner /> : "Update"}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddUpdateOrdersPopup;
