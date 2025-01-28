import { useState } from "react";
import { motion } from "framer-motion";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import useFetchData from "../../../hooks/useFetchData";

const monthlySalesData = [
  { month: "Jan", sales: 4000 },
  { month: "Feb", sales: 3000 },
  { month: "Mar", sales: 5000 },
  { month: "Apr", sales: 4500 },
  { month: "May", sales: 6000 },
  { month: "Jun", sales: 5500 },
  { month: "Jul", sales: 7000 },
];

const VITE_API_URL = import.meta.env.VITE_API_URL;
const SalesOverviewChart = () => {
  const [selectedTimeRange, setSelectedTimeRange] = useState("This Month");

  const { data, loading } = useFetchData(
    `${VITE_API_URL}/api/v1/analytics/chart/sales-overview`
  );
  console.log(data, loading);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-7"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-gray-100">Sales Overview</h2>

        <select
          className="bg-gray-700 text-white rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={selectedTimeRange}
          onChange={(e) => setSelectedTimeRange(e.target.value)}
        >
          <option value="This Week">This Week</option>
          <option value="This Month">This Month</option>
          <option value="This Quarter">This Quarter</option>
          <option value="This Year">This Year</option>
        </select>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer>
          <AreaChart data={data?.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3Af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31, 41, 55 , 0.8)",
                borderColor: "#485563",
              }}
              itemStyle={{ color: "E5E7EB" }}
            />
            <Area
              type="monotone"
              dataKey="totalRevenue"
              stroke="#885CF6"
              fill="#885CF6"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="averageOrderValue"
              stroke="#6366F1"
              fill="#6366F1"
              fillOpacity={0.3}
            />
            <Area
              type="monotone"
              dataKey="totalSales"
              stroke="#108981"
              fill="#108981"
              fillOpacity={0.3}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
