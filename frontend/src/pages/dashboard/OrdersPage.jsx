import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle,
  Clock,
  NutOff,
  ShoppingBag,
} from "lucide-react";
import StatCard from "../../components/dashboard/common/StatCard";
import OrderTable from "../../components/dashboard/orders/OrderTable";
import Header from "../../components/dashboard/Header";
import DailyOrders from "../../components/dashboard/orders/DailyOrders";
import OrderDistribution from "../../components/dashboard/orders/OrderDistribution";
import AddUpdateOrdersPopup from "../../components/dashboard/orders/AddUpdateOrdersPopup";
import useFetchData from "../../hooks/useFetchData";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const OrdersPage = () => {
  document.title = "Admin Dashboard - Orders";

  const [isPopupActive, setIsPopupActive] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const { data, loading, error } = useFetchData(
    `${VITE_API_URL}/api/v1/analytics/order-cards`
  );
  console.log(data, loading);

  const handleEditClick = (order) => {
    console.log(order);
    setSelectedOrder(order); // Set the selected order details
    setIsPopupActive(true); // Activate the popup
  };

  const handlePopupModelClose = () => {
    setIsPopupActive(false);
  };

  return (
    <div className="flex-1 overflow-y-auto relative z-10 pb-6 text-left">
      <Header title="Orders" />

      <main className="max-w-7xl mx-auto pt-6 px-6 lg:px-8 xl:px-20">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Orders"
            icon={ShoppingBag}
            value={loading ? "Loading..." : data?.data?.totalOrders}
            color="#6366F1"
          />
          <StatCard
            name="Pending Orders"
            icon={Clock}
            value={loading ? "Loading..." : data?.data?.pendingOrders}
            color="#F59E08"
          />
          <StatCard
            name="Completed Orders"
            icon={CheckCircle}
            value={loading ? "Loading..." : data?.data?.deliveredOrders}
            color="#108981"
          />
          <StatCard
            name="Cancelled Orders"
            icon={NutOff}
            value={loading ? "Loading..." : data?.data?.cancelledOrders}
            color="#EF4444"
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DailyOrders />
          <OrderDistribution />
        </div>

        <OrderTable onEditClick={handleEditClick} />

        {isPopupActive && (
          <AddUpdateOrdersPopup
            order={selectedOrder}
            onClose={handlePopupModelClose}
          />
        )}
      </main>
    </div>
  );
};

export default OrdersPage;
