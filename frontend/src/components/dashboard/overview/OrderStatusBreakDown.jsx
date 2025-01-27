import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import useFetchData from "../../../hooks/useFetchData";


const VITE_API_URL = import.meta.env.VITE_API_URL;

const COLORS = ["#FC4899", "#108981", "#6366F1", "#885CF6", "#F59E08"];
const OrderStatusBreakDown = () => {
  const { data } = useFetchData(
    `${VITE_API_URL}/api/v1/analytics/chart/order-status-breakdown`
  );

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-80 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h2 className="text-lg font-medium mb-4 text-gray-100">
        Order Status Break Down
      </h2>

      <div className="h-80">
        <ResponsiveContainer width={"100%"} height={"100%"}>
          <PieChart>
            <Pie
              data={data?.data}
              cx={"50%"}
              cy={"50%"}
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="count"
              label={({ name, percentage }) => `${name} ${percentage}%`}
            >
              {data?.data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(31,41, 55, 0.8)",
                borderColor: "#485563",
              }}
              itemStyle={{ color: "#E5E768" }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};

export default OrderStatusBreakDown;
