/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";

const AddUpdateOrdersPopup = ({ order, onClose }) => {
  // const [orderId, setOrderId] = useState(order?.orderId || "");
  const [firstname, setFirstname] = useState(order?.firstname || "");
  const [lastname, setLastname] = useState(order?.lastname || "");
  const [totalPrice, setTotalPrice] = useState(order?.totalPrice || 0);
  const [paymentStatus, setPaymentStatus] = useState(
    order?.paymentStatus || "Pending"
  );
  const [deliveredAt, setDeliveredAt] = useState(order?.deliveredAt || "");

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  console.log(order);

  return (
    <motion.div
      className="fixed flex-center left-0 top-0 w-full h-full z-10 drop-shadow text-slate-500 backdrop-filter backdrop-blur-sm bg-opacity-5 "
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className=" w-11/12  sm:w-[600px] md:w-[800px] px-6 py-4 h-auto bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-600 mb-6">
        <div className=" flex items-center justify-between">
          <h1 className="text-white">
            {order ? "Update Order Details" : "Add New Order"}
          </h1>
          <div className="py-1 flex-center transition-all rounded-md hover:bg-red-500 w-7 cursor-pointer hover:text-white">
            <X size={18} className="" onClick={onClose} />
          </div>
        </div>
        <form
          className="px-1 py-2 sm:p-5 text-slate-100"
          onSubmit={handleSubmit}
        >
          <div>
            <h3 className="ml-1 mb-2 text-lg">Order ID : <span className="text-red-400">{order?.orderId}</span></h3>
          </div>
          <div className="flex items-center gap-2">
            <div>
              <label htmlFor="name" className="ml-1">
                Frist Name
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <input
                  type="text"
                  id="name"
                  required
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full sm:w-60 h-9 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                  placeholder="Enter Product Name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="name" className="ml-1">
                Last Name
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <input
                  type="text"
                  id="name"
                  required
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full sm:w-60 h-9 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                  placeholder="Enter Product Name"
                />
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="description" className="ml-1">
              Product Description
              <span className="text-red-400 ml-1">*</span>
            </label>
            <div className="py-1">
              <textarea
                type="text"
                id="description"
                required
                // value={description}
                // onChange={(e) => setDescription(e.target.value)}
                className="w-full h-28 resize-none py-2 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                placeholder="Enter Product Name"
              />
            </div>
          </div>
          <div className="flex items-center gap-x-4 gap-y-2 flex-wrap">
            <div>
              <label htmlFor="price" className="ml-1">
                Price
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <input
                  type="number"
                  id="price"
                  required
                  //   value={price}
                  //   onChange={(e) => setPrice(e.target.value)}
                  className="w-24 sm:w-32 h-10 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                  placeholder="Price"
                />
              </div>
            </div>
            <div>
              <label htmlFor="stock" className="ml-1">
                Stock
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <input
                  type="number"
                  id="stock"
                  required
                  //   value={stock}
                  //   onChange={(e) => setStock(e.target.value)}
                  className="w-24 sm:w-32 h-10 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                  placeholder="Stock"
                />
              </div>
            </div>
            <div>
              <label htmlFor="category" className="ml-1">
                Category
                <span className="text-red-400 ml-1">*</span>
              </label>
              <div className="py-1">
                <select
                  id="category"
                  //   value={category}
                  required
                  //   onChange={(e) => setCategory(e.target.value)}
                  className="w-full sm:w-60 h-10 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                >
                  <option value="">Choose a category</option>
                  <option value="vegitables">Vegitables</option>
                  <option value="fruits">Fruits</option>
                </select>
              </div>
            </div>
          </div>
          <div className="sm:flex items-center gap-8 py-3">
            <div>
              <label className="">What is Featured product ?</label>
              <div className="flex items-center gap-3 py-2 ml-1">
                <label htmlFor="fyes">Yes</label>
                <input
                  type="checkbox"
                  name="fyes"
                  id="fyes"
                  value={true}
                  className="size-4 cursor-pointer"
                />

                <label htmlFor="fno">No</label>
                <input
                  type="checkbox"
                  name="fno"
                  id="fno"
                  value={false}
                  className="size-4 cursor-pointer"
                />
              </div>
            </div>
            <div>
              <label className="ml-1">What is Trending Product ?</label>
              <div className="flex items-center gap-3 py-2 ml-1">
                <label htmlFor="tyes">Yes</label>
                <input
                  type="checkbox"
                  name="tyes"
                  id="tyes"
                  value={true}
                  className="size-4 cursor-pointer"
                />

                <label htmlFor="tno">No</label>
                <input
                  type="checkbox"
                  name="tno"
                  id="tno"
                  value={false}
                  className="size-4 cursor-pointer"
                />
              </div>
            </div>
          </div>
          <div>
            <button
              className="px-6 rounded-md py-2 border text-slate-100 border-slate-500 font-semibold transition-all hover:text-white hover:bg-slate-700 hover:shadow-md shadow-slate-300"
              type="submit"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default AddUpdateOrdersPopup;
