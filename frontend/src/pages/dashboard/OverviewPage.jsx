import { motion } from "framer-motion";

import Header from "../../components/dashboard/Header";
import StatCard from "../../components/dashboard/common/StatCard";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import SalesOverviewChart from "../../components/dashboard/overview/SalesOverviewChart";
import CategoryDistributionChart from "../../components/dashboard/overview/CategoryDistributionChart";
import useFetchData from "../../hooks/useFetchData";
import TopSellingProducts from "../../components/dashboard/overview/TopSellingProducts";
import OrderStatusBreakDown from "../../components/dashboard/overview/OrderStatusBreakDown";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const OverviewPage = () => {
  const { data, loading } = useFetchData(
    `${VITE_API_URL}/api/v1/analytics/overview-cards`
  );

  document.title = "Admin Dashboard - Overview";
  return (
    <div className="flex-1 overflow-y-auto relative z-10 pb-6 text-left">
      <Header title="Overview" />

      <main className="max-w-7xl mx-auto pt-6 px-6 lg:px-8 xl:px-20">
        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 1 }}
          transition={{ duration: 1 }}
        >
          <StatCard
            name="Total Sales"
            icon={Zap}
            value={
              loading ? "Loaidng..." : parseInt(data?.data?.totaSales) || 0
            }
            color="#6366F1"
          />
          <StatCard
            name="New Users"
            icon={Users}
            value={loading ? "Loaidng..." : parseInt(data?.data?.newUsers)}
            color="#885CF6"
          />
          <StatCard
            name="Total Products"
            icon={ShoppingBag}
            value={loading ? "Loaidng..." : parseInt(data?.data?.totalProducts)}
            color="#EC4899"
          />
          <StatCard
            name="Pending Orders"
            icon={BarChart2}
            value={loading ? "Loaidng..." : parseInt(data?.data?.pendingOrders)}
            color="#108981"
          />
        </motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <OrderStatusBreakDown />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-7">
          <TopSellingProducts />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
