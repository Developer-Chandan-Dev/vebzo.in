import { motion } from "framer-motion";

const SearchBox = () => {
  return (
    <motion.div
      className="fixed flex-center left-0 top-0 w-full h-full z-10 drop-shadow text-slate-500 backdrop-filter backdrop-blur-sm bg-opacity-5 "
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className=" w-11/12  sm:w-[600px] md:w-[800px] px-6 py-4 h-96 bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-600 mb-6"></div>
    </motion.div>
  );
};

export default SearchBox;
