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

const userActivityData = [
  {
    name: "Mon",
    "0-4": 20,
    "4-8": 40,
    "8-12": 60,
    "12-16": 80,
    "16-20": 100,
    "20-24": 30,
  },
  {
    name: "Tue",
    "0-4": 30,
    "4-8": 50,
    "8-12": 70,
    "12-16": 90,
    "16-20": 110,
    "20-24": 40,
  },
  {
    name: "Wed",
    "0-4": 40,
    "4-8": 60,
    "8-12": 80,
    "12-16": 100,
    "16-20": 120,
    "20-24": 50,
  },
  {
    name: "Thu",
    "0-4": 50,
    "4-8": 70,
    "8-12": 90,
    "12-16": 110,
    "16-20": 130,
    "20-24": 60,
  },
  // {
  //   name: "Fri",
  //   "0-4": 60,
  //   "4-8": 80,
  //   "8-12": 100,
  //   "12-16": 120,
  //   "16-20": 140,
  //   "20-24": 70,
  // },
  // {
  //   name: "Sat",
  //   "0-4": 70,
  //   "4-8": 90,
  //   "8-12": 100,
  //   "12-16": 130,
  //   "16-20": 150,
  //   "20-24": 80,
  // },
  // {
  //   name: "Sun",
  //   "0-4": 80,
  //   "4-8": 100,
  //   "8-12": 120,
  //   "12-16": 140,
  //   "16-20": 160,
  //   "20-24": 90,
  // },
];

const productPerformanceData = [
  { name: "Product A", sales: 4000, revenue: 2400, profit: 2400 },
  { name: "Product B", sales: 3000, revenue: 1298, profit: 2210 },
  { name: "Product C", sales: 2000, revenue: 9800, profit: 2290 },
  { name: "Product D", sales: 2700, revenue: 3900, profit: 2000 },
  { name: "Product E", sales: 1890, revenue: 4800, profit: 2181 },
];

const ProductPerformance = () => {
  return (
    <motion.div
      className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        User Activity Heatmap
      </h2>

      <div className="h-80 ">
        <ResponsiveContainer>
          <BarChart data={productPerformanceData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#485563" />
            <XAxis dataKey={"name"} stroke="#9ca3af" />
            <YAxis stroke="#9ca3af" />

            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41, 55, 0.8)",
                borderColor: "#485563",
              }}
              itemStyle={{ color: "#E5E768" }}
            />

            <Legend />
            <Bar dataKey="sales" fill="#885CF6" />
            <Bar dataKey="revenue" fill="#108981" />
            <Bar dataKey="profit" fill="#F59E08" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default ProductPerformance;
