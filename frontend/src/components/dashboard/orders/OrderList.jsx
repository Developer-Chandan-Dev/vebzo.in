/* eslint-disable react/prop-types */
import { Edit, IndianRupee, Origami, Trash2 } from "lucide-react";
import { useState } from "react";

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
}) => {
  const [newStatus, setNewStatus] = useState(status || "Pending");
  const [newPaymentStatus, setNewPaymentStatus] = useState(
    paymentStatus || "Pending"
  );

  console.log(orderId, firstname, lastname);
  return (
    <>
      <div className="w-full h-auto p-5 border border-gray-600 rounded-md flex items-start flex-wrap gap-5 justify-between relative">
        <div className="flex items-start gap-5">
          <div className="border w-10 h-10 flex-center rounded-md border-gray-600">
            <Origami />
          </div>
          <div>
            <h4 className="pb-2 text-red-400 font-medium">{orderId}</h4>
            <ul className="pb-2">
              {orderItems.map(({ product, quantity, price }, index) => (
                <li key={index}>
                  {product} x {quantity} = {price * quantity}
                </li>
              ))}
            </ul>
            <h4 className="pb-2 font-semibold text-slate-200">
              {firstname} {lastname}
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
          <h4 className="pb-2">Items : {orderItems.length}</h4>
          <ul>
            <li>
              <b>Method :</b> {paymentMethod}
            </li>
            <li>
              <b>Payment Status :</b> {paymentStatus}
            </li>
            <li>
              <b>Order Date :</b> {createdAt}
            </li>
            <li>
              <b>Delivery Date :</b> {deliveredAt}
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-2">
          <b>Total :</b>
          <span className="flex items-center">
            <IndianRupee size={13} /> <span>{totalPrice}</span>
          </span>
        </div>
        <div className="flex items-center flex-col gap-5 ">
          <div className="absolute right-5 bottom-4">
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
            <button className="text-red-400 hover:text-red-300">
              <Trash2 size={18} />
            </button>
          </div>
          <select
            name="status"
            id="status"
            className="bg-gray-700 border border-gray-600 outline outline-gray-600 py-2 px-3 w-48 rounded-md"
            value={newStatus}
            onChange={(e) => setNewStatus(e.target.value)}
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Out for delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <select
            name="paymentStatus"
            id="paymentStatus"
            value={newPaymentStatus}
            onChange={(e) => setNewPaymentStatus(e.target.value)}
            className="bg-gray-700 border border-gray-600 outline outline-gray-600 py-2 px-3 w-48 rounded-md"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>
    </>
  );
};

export default OrderList;
