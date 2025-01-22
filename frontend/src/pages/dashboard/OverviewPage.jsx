import { motion } from "framer-motion";

import Header from "../../components/dashboard/Header";
import StatCard from "../../components/dashboard/common/StatCard";
import { BarChart2, ShoppingBag, Users, Zap } from "lucide-react";
import SalesOverviewChart from "../../components/dashboard/overview/SalesOverviewChart";
import CategoryDistributionChart from "../../components/dashboard/overview/CategoryDistributionChart";


const OverviewPage = () => {
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
            value="$12,345"
            color="#6366F1"
          />
          <StatCard
            name="New Users"
            icon={Users}
            value="1,234"
            color="#885CF6"
          />
          <StatCard
            name="Total Products"
            icon={ShoppingBag}
            value="567"
            color="#EC4899"
          />
          <StatCard
            name="Pending Orders"
            icon={BarChart2}
            value="10"
            color="#108981"
          />
        </motion.div>

        {/* CHARTS */}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <SalesOverviewChart />
          <CategoryDistributionChart />
        </div>
      </main>
    </div>
  );
};

export default OverviewPage;
