import { motion } from "framer-motion";
import { CheckCircle, Clock, DollarSign, ShoppingBag } from "lucide-react";
import StatCard from "../../components/dashboard/common/StatCard";
import OrderTable from "../../components/dashboard/orders/OrderTable";
import Header from "../../components/dashboard/Header";
import DailyOrders from "../../components/dashboard/orders/DailyOrders";
import OrderDistribution from "../../components/dashboard/orders/OrderDistribution";

const orderStats = {
  totalOrders: "1,234",
  pendingOrders: "56",
  completeOrders: "1,178",
  totalRevenue: "$98,765",
};

const OrdersPage = () => {
  document.title = "Admin Dashboard - Orders";

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
            value={orderStats.totalOrders}
            color="#6366F1"
          />
          <StatCard
            name="Pending Orders"
            icon={Clock}
            value={orderStats.pendingOrders}
            color="#F59E08"
          />
          <StatCard
            name="Completed Orders"
            icon={CheckCircle}
            value={orderStats.completeOrders}
            color="#108981"
          />
          <StatCard
            name="Total Revenue"
            icon={DollarSign}
            value={orderStats.totalRevenue}
            color="#EF4444"
          />
        </motion.div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <DailyOrders />
          <OrderDistribution />
        </div>

        <OrderTable />
      </main>
    </div>
  );
};

export default OrdersPage;
