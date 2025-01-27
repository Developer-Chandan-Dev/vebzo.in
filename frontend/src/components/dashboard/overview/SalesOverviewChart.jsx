import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";
import useFetchData from "../../../hooks/useFetchData";

const VITE_API_URL = import.meta.env.VITE_API_URL;

const SalesOverviewChart = () => {
  const { data }= useFetchData(`${VITE_API_URL}/api/v1/analytics/chart/monthly-sales`)

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">Sales Overview</h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <LineChart data={data?.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#485563" />
            <XAxis dataKey={"month"} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41, 55,0.8)",
                borderColor: "#485563",
              }}
              itemStyle={{ color: "#E5E7E8" }}
            />
            <Line
              type="monotone"
              dataKey="totalRevenue"
              stroke="#ec4899"
              strokeWidth={3}
              dot={{ fill: "#ec4899", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="averageOrderValue"
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ fill: "#6366F1", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="totalSales"
              stroke="#108981"
              strokeWidth={3}
              dot={{ fill: "#108981", strokeWidth: 2, r: 6 }}
              activeDot={{ r: 8, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default SalesOverviewChart;
