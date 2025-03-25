/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Edit, Image, IndianRupee, Trash2 } from "lucide-react";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const ProductTr = ({
  _id,
  imageUrl,
  name,
  category,
  categoryId,
  purchasePrice,
  price,
  salesPrice,
  description,
  stock,
  sold,
  view,
  onEditClick,
  handleDelete,
  setProductData,
  productData,
}) => {
  console.log(name, stock, sold);
  return (
    <motion.tr
      key={_id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className={`${stock < 5 ? "bg-red-700" : ""}`}
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-100 flex gap-2 items-center">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Product img"
            className="size-10 rounded-full"
          />
        ) : (
          <Image className="size-10 text-gray-400" />
        )}

        {name.length > 20 ? name.slice(0, 20) + "..." : name}
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        {category}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        <span className="flex items-center">
          <IndianRupee className="size-[14px]" />
          {purchasePrice?.toFixed(2)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        <span className="flex items-center">
          <IndianRupee className="size-[14px]" />
          {price.toFixed(2)}
        </span>
      </td>

      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        <span className="flex items-center">
          {salesPrice ? (
            <>
              <IndianRupee className="size-[14px]" />
              {salesPrice?.toFixed(2)}
            </>
          ) : (
            "Not Added"
          )}
        </span>
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
        <span className="flex items-center">
          <IndianRupee className="size-[14px]" />
          {parseInt(price) * parseInt(sold)}
        </span>
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
        <span className="flex items-center">
          <IndianRupee className="size-[14px]" />
          {parseInt(price) * parseInt(sold) -
            parseInt(purchasePrice) * parseInt(sold)}
        </span>
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
                categoryId,
                description,
                purchasePrice,
                price,
                salesPrice,
                stock,
                sold,
                view,
              });
            }}
          />
        </button>
        <button
          className="text-red-400 hover:text-red-300"
          onClick={() =>
            handleDelete(
              `${VITE_API_URL}/api/v1/products/${_id}`,
              name,
              _id,
              setProductData,
              productData
            )
          }
        >
          <Trash2 size={18} />
        </button>
      </td>
    </motion.tr>
  );
};

export default ProductTr;
