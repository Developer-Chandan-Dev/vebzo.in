import { motion } from "framer-motion";
import { useState } from "react";
import { Search } from "lucide-react";
import OrderTr from "./OrderTr";
import OrderList from "./OrderList";

const orderData = [
  {
    _id: 1,
    orderId: "ORD001",
    customer: "John Doe",
    firstname: "John",
    lastname: "Doe",
    orderItems: [
      {
        product: "Potato",
        quantity: 1,
        price: 20,
      },
      {
        product: "Tomato",
        quantity: 1,
        price: 20,
      },
    ],
    shippingAddress: {
      address: "Bhogwara, Ugrasenpur, Prayagraj",
      village: "Bhogwara",
      city: "Prayagraj",
      phone: "0123456789",
    },
    totalPrice: 40,
    status: "Delivered",
    paymentMethod: "COD",
    paymentStatus: "Paid",
    deliveredAt: "10/10/2024",
    total: 235.4,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
  },
  {
    _id: 2,
    orderId: "ORD002",
    customer: "Shiva Kumar",
    firstname: "Shiva",
    lastname: "Kumar",
    orderItems: [
      {
        product: "Potato",
        quantity: 2,
        price: 20,
      },
      {
        product: "Tomato",
        quantity: 2,
        price: 20,
      },
    ],
    shippingAddress: {
      address: "Bhogwara, Ugrasenpur, Prayagraj",
      village: "Bhogwara",
      city: "Prayagraj",
      phone: "0123456789",
    },
    totalPrice: 80,
    status: "Pending",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    deliveredAt: "10/10/2024",
    total: 235.4,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
  },
  {
    _id: 3,
    orderId: "ORD003",
    customer: "Shiva Kumar",
    firstname: "Shiva",
    lastname: "Kumar",
    orderItems: [
      {
        product: "Potato",
        quantity: 2,
        price: 20,
      },
      {
        product: "Tomato",
        quantity: 2,
        price: 20,
      },
    ],
    shippingAddress: {
      address: "Bhogwara, Ugrasenpur, Prayagraj",
      village: "Bhogwara",
      city: "Prayagraj",
      phone: "0123456789",
    },
    totalPrice: 80,
    status: "Pending",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    deliveredAt: "10/10/2024",
    total: 235.4,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
  },
  {
    _id: 4,
    orderId: "ORD004",
    customer: "Shiva Kumar",
    firstname: "Shiva",
    lastname: "Kumar",
    orderItems: [
      {
        product: "Potato",
        quantity: 2,
        price: 20,
      },
      {
        product: "Tomato",
        quantity: 2,
        price: 20,
      },
    ],
    shippingAddress: {
      address: "Bhogwara, Ugrasenpur, Prayagraj",
      village: "Bhogwara",
      city: "Prayagraj",
      phone: "0123456789",
    },
    totalPrice: 80,
    status: "Pending",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    deliveredAt: "10/10/2024",
    total: 235.4,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
  },
  {
    _id: 5,
    orderId: "ORD005",
    customer: "Shiva Kumar",
    firstname: "Shiva",
    lastname: "Kumar",
    orderItems: [
      {
        product: "Potato",
        quantity: 2,
        price: 20,
      },
      {
        product: "Tomato",
        quantity: 2,
        price: 20,
      },
    ],
    shippingAddress: {
      address: "Bhogwara, Ugrasenpur, Prayagraj",
      village: "Bhogwara",
      city: "Prayagraj",
      phone: "0123456789",
    },
    totalPrice: 80,
    status: "Pending",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    deliveredAt: "10/10/2024",
    total: 235.4,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
  },
  {
    _id: 6,
    orderId: "ORD006",
    customer: "Shiva Kumar",
    firstname: "Shiva",
    lastname: "Kumar",
    orderItems: [
      {
        product: "Potato",
        quantity: 2,
        price: 20,
      },
      {
        product: "Tomato",
        quantity: 2,
        price: 20,
      },
    ],
    shippingAddress: {
      address: "Bhogwara, Ugrasenpur, Prayagraj",
      village: "Bhogwara",
      city: "Prayagraj",
      phone: "0123456789",
    },
    totalPrice: 80,
    status: "Pending",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    deliveredAt: "10/10/2024",
    total: 235.4,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
  },
  {
    _id: 7,
    orderId: "ORD007",
    customer: "Shiva Kumar",
    firstname: "Shiva",
    lastname: "Kumar",
    orderItems: [
      {
        product: "Potato",
        quantity: 2,
        price: 20,
      },
      {
        product: "Tomato",
        quantity: 2,
        price: 20,
      },
    ],
    shippingAddress: {
      address: "Bhogwara, Ugrasenpur, Prayagraj",
      village: "Bhogwara",
      city: "Prayagraj",
      phone: "0123456789",
    },
    totalPrice: 80,
    status: "Pending",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    deliveredAt: "10/10/2024",
    total: 235.4,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
  },
  {
    _id: 8,
    orderId: "ORD008",
    customer: "Shiva Kumar",
    firstname: "Shiva",
    lastname: "Kumar",
    orderItems: [
      {
        product: "Potato",
        quantity: 2,
        price: 20,
      },
      {
        product: "Tomato",
        quantity: 2,
        price: 20,
      },
    ],
    shippingAddress: {
      address: "Bhogwara, Ugrasenpur, Prayagraj",
      village: "Bhogwara",
      city: "Prayagraj",
      phone: "0123456789",
    },
    totalPrice: 80,
    status: "Pending",
    paymentMethod: "COD",
    paymentStatus: "Pending",
    deliveredAt: "10/10/2024",
    total: 235.4,
    createdAt: "2024-06-01",
    updatedAt: "2024-06-01",
  },
];

const OrderTable = ({ onEditClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredOrders, setFilteredOrders] = useState(orderData);
  const [activeList, setActiveList] = useState(true);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = orderData.filter(
      (order) =>
        order.customer.toLowerCase().includes(term) ||
        order.id.toLowerCase().includes(term)
    );

    setFilteredOrders(filtered);
  };

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
            onChange={handleSearch}
            value={searchTerm}
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
                  Order Date
                </th>
                <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-700">
              {filteredOrders.length > 0
                ? filteredOrders.map((order) => (
                    <OrderTr
                      key={order._id}
                      _id={order._id}
                      orderId={order.orderId}
                      firstname={order.firstname}
                      lastname={order.lastname}
                      orderItems={order.orderItems}
                      shippingAddress={order.shippingAddress}
                      totalPrice={order.totalPrice}
                      paymentMethod={order.paymentMethod}
                      paymentStatus={order.paymentStatus}
                      deliveredAt={order.deliveredAt}
                      status={order.status}
                      createdAt={order.createdAt}
                      onEditClick={onEditClick}
                    />
                  ))
                : "Nothing found"}
            </tbody>
          </table>
        )}

        {activeList && filteredOrders.length > 0
          ? filteredOrders.map((order) => (
              <OrderList
                key={order._id}
                _id={order._id}
                orderId={order.orderId}
                firstname={order.firstname}
                lastname={order.lastname}
                orderItems={order.orderItems}
                shippingAddress={order.shippingAddress}
                totalPrice={order.totalPrice}
                paymentMethod={order.paymentMethod}
                paymentStatus={order.paymentStatus}
                deliveredAt={order.deliveredAt}
                status={order.status}
                createdAt={order.createdAt}
                onEditClick={onEditClick}
              />
            ))
          : ""}
      </div>
    </motion.div>
  );
};

export default OrderTable;
