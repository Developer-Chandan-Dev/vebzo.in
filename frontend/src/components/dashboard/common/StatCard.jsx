/* eslint-disable react/prop-types */
import { motion } from "framer-motion";

const StatCard = ({ name = "Name", icon: Icon, value, color }) => {
  return (
    <motion.div
      className="bg-gray-80 bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-lg border border-gray-700"
      whileHover={{ y: -5, boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)" }}
    >
      <div className="px-4 py-5 sm:p-6 ">
        <span className="flex items-center text-sm font-medium text-gray-400">
          <Icon size={20} className="mr-2" style={{ color }} />
          {name}
        </span>
        <p className="mt-1 font-semibold text-gray-100 text-3xl ">{value}</p>
      </div>
    </motion.div>
  );
};

export default StatCard;
