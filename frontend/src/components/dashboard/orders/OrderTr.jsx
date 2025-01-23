/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Edit, IndianRupee, Trash2 } from "lucide-react";

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
  createdAt,
  onEditClick,
}) => {
  return (
    <motion.tr
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {orderId}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {firstname} {lastname}
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
              : status === "Processing"
              ? "bg-yellow-100 text-yellow-800"
              : status === "Shipped"
              ? "bg-blue-100 text-blue-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {status}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {createdAt}
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
          <button className="text-red-400 hover:text-red-300">
            <Trash2 size={18} />
          </button>
        </div>
      </td>
    </motion.tr>
  );
};

export default OrderTr;
