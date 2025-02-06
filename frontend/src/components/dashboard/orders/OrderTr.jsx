/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Edit, IndianRupee, Trash2 } from "lucide-react";
import { formatDate } from "../../../utils/dateUtils";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const OrderTr = ({
  _id,
  orderId,
  firstname,
  lastname,
  orderItems,
  shippingAddress,
  totalPrice,
  paymentMethod,
  paymentStatus,
  deliveredAt,
  status,
  username,
  createdAt,
  onEditClick,
  handleDelete,
  setOrderItems,
  orderItems2,
}) => {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {orderId ? orderId : "No orderId"}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {firstname ? `${firstname} ${lastname}` : username}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center">
        <IndianRupee size={12} />
        <span>{totalPrice}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        <span
          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
            status === "Delivered"
              ? "bg-green-100 text-green-800"
              : status === "Out for Delivery"
              ? "bg-yellow-100 text-yellow-800"
              : status === "Confirmed"
              ? "bg-blue-100 text-blue-800"
              : status === "Pending"
              ? "bg-slate-100 text-slate-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        <span
          className={`px-2 inline-flex text-xs leading-5 mx-auto font-semibold rounded-full ${
            paymentStatus === "Paid"
              ? "bg-green-100 text-green-800"
              : paymentStatus === "Pending"
              ? "bg-slate-100 text-slate-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {paymentStatus}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {formatDate(createdAt)}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        <div className="flex-center">
          <button className="text-indigo-400 hover:text-indigo-300 mr-2">
            <Edit
              size={18}
              onClick={() => {
                onEditClick({
                  _id,
                  orderId,
                  firstname,
                  lastname,
                  orderItems,
                  shippingAddress,
                  totalPrice,
                  paymentMethod,
                  paymentStatus,
                  deliveredAt,
                  status,
                  createdAt,
                });
              }}
            />
          </button>
          <button
            className="text-red-400 hover:text-red-300"
            onClick={() =>
              handleDelete(
                `${VITE_API_URL}/api/v1/orders/${_id}`,
                orderId,
                _id,
                setOrderItems,
                orderItems2
              )
            }
          >
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default OrderTr;
