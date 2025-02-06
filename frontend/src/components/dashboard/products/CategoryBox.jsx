/* eslint-disable react/prop-types */
import { Edit, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const CategoryBox = ({
  _id,
  name,
  description,
  onEditClick,
  handleDelete,
  setCategories,
  categories,
}) => {
  return (
    <motion.div
      className="bg-gray-800 w-80 rounded-md p-4 border border-gray-600 "
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 1 }}
      transition={{ duration: 1 }}
    >
      <div className="flex-between border-b border-gray-600 pt-1 pb-3">
        <h1 className="text-lg font-semibold">{name}</h1>
        <div className="flex items-center gap-2">
          <button className="text-indigo-400 hover:text-indigo-300 mr-2">
            <Edit
              size={18}
              onClick={() => {
                onEditClick({
                  _id,
                  name,
                  description,
                });
              }}
            />
          </button>
          <button
            className="text-red-400 hover:text-red-300"
            onClick={() =>
              handleDelete(
                `${VITE_API_URL}/api/v1/category/${_id}`,
                name,
                _id,
                setCategories,
                categories
              )
            }
          >
            <Trash2 size={18} />
          </button>
        </div>
      </div>

      <p className="py-2">{description}</p>
    </motion.div>
  );
};

export default CategoryBox;
