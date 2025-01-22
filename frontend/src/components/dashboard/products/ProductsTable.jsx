/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Search, Plus, X } from "lucide-react";
import { useState } from "react";
import ProductTr from "./ProductTr";

const PRODUCT_DATA = [
  {
    _id: 1,
    name: "Potato",
    imageUrl: "/public/images/potato-1.webp",
    category: "Vegetables",
    price: 20,
    stock: 143,
    sold: 50,
    view: 5,
  },
  {
    _id: 2,
    name: "Tomato",
    imageUrl: "/public/images/tomato-country-1.webp",
    category: "Vegetables",
    price: 30,
    stock: 89,
    sold: 100,
    view: 5,
  },
  {
    _id: 3,
    name: "Onion",
    imageUrl: "/public/images/onion-1.webp",
    category: "Vegetables",
    price: 60,
    stock: 56,
    sold: 50,
    view: 5,
  },
  {
    _id: 4,
    name: "Cauliflower",
    imageUrl: "/public/images/cauliflower-1.webp",
    category: "Vegetables",
    price: 20,
    stock: 210,
    sold: 20,
    view: 5,
  },
  {
    _id: 5,
    name: "Cabbage",
    imageUrl: "/public/images/cabbage-1.webp",
    category: "Vegetables",
    price: 30,
    stock: 100,
    sold: 20,
    view: 5,
  },
];

const ProductsTable = ({ onEditClick }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);
  const [activeSearchBox, setActiveSearchBox] = useState(false);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = PRODUCT_DATA.filter(
      (product) =>
        product.name.toLowerCase().includes(term) ||
        product.category.toLowerCase().includes(term)
    );

    setFilteredProducts(filtered);
  };

  return (
    <motion.div
      className="bg-gray-800 bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-700 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="flex justify-between items-center mb-6 gap-2 flex-wrap relative">
        <div className="flex items-center gap-3">
          <h2 className="text-xl font-semibold text-gray-100">Product List</h2>
          <button className="flex items-center gap-[6px] border border-gray-700 px-3 py-2 rounded-md hover:bg-gray-700 " onClick={()=> onEditClick()}>
            <Plus className="size-5 font-bold" />
            <span className="hidden sm:block">Add New</span>
          </button>
        </div>
        <div className="">
          <button
            className="flex sm:hidden items-center gap-[6px] border border-gray-700 px-3 py-2 rounded-md hover:bg-gray-700 "
            onClick={() => setActiveSearchBox(true)}
          >
            <Search className="size-5 font-bold" />
          </button>
          <div
            className={`${
              activeSearchBox ? "flex" : "hidden"
            } sm:flex items-center justify-center absolute left-0 bg-gray-800 top-0 w-full py-3 sm:relative gap-2`}
          >
            <div className="relative ">
              <input
                type="text"
                placeholder="Search products..."
                className="bg-gray-700 text-white placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onChange={handleSearch}
                value={searchTerm}
              />
              <Search
                className="absolute left-3 top-2.5 text-gray-400"
                size={18}
              />
            </div>
            <button
              className="flex sm:hidden items-center gap-[6px] border border-gray-700 px-3 py-2 rounded-md hover:bg-gray-700 "
              onClick={() => setActiveSearchBox(false)}
            >
              <X className="size-5 font-bold" />
            </button>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                Stock
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                Sold
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                View
              </th>
              <th className="px-6 py-3 text-left font-medium text-gray-400 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-700">
            {filteredProducts.map((product) => (
              <ProductTr
                key={product._id}
                _id={product._id}
                name={product.name}
                imageUrl={product?.imageUrl}
                category={product.category}
                price={product.price}
                stock={product.stock}
                sold={product.sold}
                view={product.view}
                onEditClick={onEditClick}
              />
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsTable;
