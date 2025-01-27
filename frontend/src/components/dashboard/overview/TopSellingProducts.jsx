import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { motion } from "framer-motion";
import useFetchData from "../../../hooks/useFetchData";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const TopSellingProducts = () => {
  const { data } = useFetchData(`${VITE_API_URL}/api/v1/analytics/chart/top-selling-products`);

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Top Selling Products
      </h2>

      <div className="h-80 ">
        <ResponsiveContainer>
          <BarChart data={data?.data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#485563" />
            <XAxis dataKey={"productName"} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41, 55, 0.8)",
                borderColor: "#485563",
              }}
              itemStyle={{ color: "#E5E768" }}
            />

            <Legend />
            <Bar dataKey="totalQuantity" fill="#885CF6" />
            <Bar dataKey="totalRevenue" fill="#108981" />
            {/* <Bar dataKey="profit" fill="#F59E08" /> */}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default TopSellingProducts;
