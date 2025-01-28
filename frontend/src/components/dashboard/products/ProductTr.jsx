/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Edit, IndianRupee, Trash2 } from "lucide-react";

const ProductTr = ({
  _id,
  imageUrl,
  name,
  category,
  price,
  stock,
  sold,
  view,
  onEditClick,
}) => {
  return (
    <motion.tr
      key={_id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
        <img
          src={imageUrl ? imageUrl : "/public/images/potato-1.webp"}
          alt="Product img"
          className="size-10 rounded-full"
        />
        {name}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300 flex items-center ">
        <IndianRupee className="size-[14px]" />
        <span>{price.toFixed(2)}</span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {stock}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {sold}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {view}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        <button className="text-indigo-400 hover:text-indigo-300 mr-2">
          <Edit
            size={18}
            onClick={() => {
              onEditClick({
                _id,
                name,
                imageUrl,
                category,
                price,
                stock,
                sold,
                view,
              });
            }}
          />
        </button>
        <button className="text-red-400 hover:text-red-300">
          <Trash2 size={18} />
        </button>
      </td>
    </motion.tr>
  );
};

export default ProductTr;
