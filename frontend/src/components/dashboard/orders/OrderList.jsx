/* eslint-disable react/prop-types */
import { Edit, IndianRupee, Origami, Trash2 } from "lucide-react";
import { useState } from "react";
import { formatDate, formatDateTime } from "../../../utils/dateUtils";
import useHandleSendingRequest from "../../../hooks/useHandleSendingRequest";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const OrderList = ({
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
  username,
  handleDelete,
  setOrderItems,
  orderItems2,
  grandTotal,
  deliveryCharge,
}) => {
  const [newStatus, setNewStatus] = useState(status || "Pending");
  const [newPaymentStatus, setNewPaymentStatus] = useState(
    paymentStatus || "Pending"
  );
  console.log(grandTotal, deliveryCharge, totalPrice, 33);

  const { handleSubmit } = useHandleSendingRequest();

  const handleStatusUpdate = async (e) => {
    const response = await handleSubmit(
      "PUT",
      `${VITE_API_URL}/api/v1/orders/${_id}/status`,
      {
        status: e.target.value,
      }
    );
    if (response.success === true) {
      setNewStatus(response?.status);
    } else {
      console.log(response);
    }
  };

  const handlePaymentStatusUpdate = async (e) => {
    const response = await handleSubmit(
      "PUT",
      `${VITE_API_URL}/api/v1/orders/${_id}/payment-status`,
      {
        paymentStatus: e.target.value,
      }
    );
    if (response.success === true) {
      setNewPaymentStatus(response?.paymentStatus);
    } else {
      console.log(response);
    }
  };

  return (
    <>
      <div className="w-full h-auto px-5 py-7 border border-gray-600 bg-gray-800 rounded-md flex items-start flex-wrap gap-5 justify-between relative mb-5">
        <div className="flex items-start gap-5">
          <div className="border w-10 h-10 flex-center rounded-md border-gray-600">
            <Origami />
          </div>
          <div>
            <h4 className="pb-2 text-red-400 font-medium">
              {orderId ? orderId : "No orderId"}
            </h4>
            <ul className="pb-2">
              {orderItems.map(({ product, quantity, price }, index) => (
                <li key={index}>
                  {product?.name} x {quantity} = {price * quantity}
                </li>
              ))}
            </ul>
            <h4 className="pb-2 font-semibold text-slate-200">
              {firstname ? `${firstname} ${lastname}` : username}
            </h4>
            <ul>
              <li>{shippingAddress && shippingAddress?.address}</li>
              <li>{shippingAddress && shippingAddress?.village}</li>
              <li>{shippingAddress && shippingAddress?.city}</li>
              <li>{shippingAddress && shippingAddress?.phone}</li>
            </ul>
          </div>
        </div>
        <div>
          {/* <h4 className="pb-2">Items : {orderItems.length}</h4> */}
          <ul>
            <li>
              <b>Method :</b> {paymentMethod}
            </li>
            <li>
              <b>Payment Status :</b> {paymentStatus}
            </li>
            <li>
              <b>Order Date :</b> {formatDate(createdAt)}
            </li>
            <li>
              <b>Delivery Date :</b>{" "}
              {deliveredAt ? formatDateTime(deliveredAt) : ""}
            </li>
            <li className="mt-3">
              <span className="flex items-center">
                <b>Total :</b>
                <IndianRupee size={13} /> <span>{totalPrice}</span>
              </span>
            </li>
            <li>
              <span className="flex items-center">
                <b>Delivery Charge :</b>
                <IndianRupee size={13} /> <span>{deliveryCharge}</span>
              </span>
            </li>
            <li>
              <span className="flex items-center">
                <b>Grand Total :</b>
                <IndianRupee size={13} /> <span>{grandTotal}</span>
              </span>
            </li>
          </ul>
        </div>
        <div className="flex items-center flex-col gap-5 ">
          <select
            name="status"
            id="status"
            className="bg-gray-700 border border-gray-600 outline outline-gray-600 py-2 px-3 w-48 rounded-md"
            value={newStatus}
            onChange={handleStatusUpdate}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            name="paymentStatus"
            id="paymentStatus"
            value={newPaymentStatus}
            onChange={handlePaymentStatusUpdate}
            className="bg-gray-700 border border-gray-600 outline outline-gray-600 py-2 px-3 w-48 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </select>
          <div className="">
            <button className="px-4 py-2 rounded-md border border-gray-600 transition hover:bg-slate-600 mr-5">
              Update
            </button>
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
        </div>
      </div>
    </>
  );
};

export default OrderList;
