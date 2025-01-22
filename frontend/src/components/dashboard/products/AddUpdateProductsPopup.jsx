/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { motion } from "framer-motion";
import { Edit2, Image, X } from "lucide-react";
import { useRef, useState } from "react";

const AddUpdateProductsPopup = ({ product, onClose }) => {
  const [name, setName] = useState(product?.name || "");
  const [description, setDescription] = useState(product?.description || "");
  const [price, setPrice] = useState(product?.price || "");
  const [category, setCategory] = useState(product?.category || "");
  const [stock, setStock] = useState(product?.stock || "");
  const [isFeatured, setIsFeatured] = useState(product?.isFeatured || false);

  const [secondPage, setSecondPage] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(name, description, price, category, stock);

    if ((name, description, price, category, stock)) {
      setSecondPage(true);
    }
  };

  return (
    <motion.div
      className="fixed flex-center left-0 top-0 w-full h-full z-10 drop-shadow text-slate-500 backdrop-filter backdrop-blur-sm bg-opacity-5 "
      initial={{ opacity: 0, y: 200 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className=" w-11/12  sm:w-[600px] md:w-[800px] px-6 py-4 h-auto bg-gray-800 bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-600 mb-6">
        {!secondPage && (
          <div className="">
            <div className=" flex items-center justify-between">
              <h1 className="text-white">
                {product ? "Update Product Details" : "Add New Product"}
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
                <label htmlFor="name" className="ml-1">
                  Product Name
                  <span className="text-red-400 ml-1">*</span>
                </label>
                <div className="py-1">
                  <input
                    type="text"
                    id="name"
                    value={name}
                    required
                    onChange={(e) => setName(e.target.value)}
                    className="w-full sm:w-80 h-9 py-1 px-[10px] border rounded-md border-slate-500 outline-slate-500 my-2 bg-gray-700"
                    placeholder="Enter Product Name"
                  />
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
                    value={description}
                    required
                    onChange={(e) => setDescription(e.target.value)}
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
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
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
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
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
                      value={category}
                      required
                      onChange={(e) => setCategory(e.target.value)}
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
        )}

        {secondPage && (
          <AddUpdateProductImage
            imageUrl={product?.imageUrl}
            secondPage={secondPage}
            setSecondPage={setSecondPage}
          />
        )}
      </div>
    </motion.div>
  );
};

export default AddUpdateProductsPopup;

const AddUpdateProductImage = ({ imageUrl, secondPage, setSecondPage }) => {
  const [image, setImage] = useState(imageUrl || null);
  const [filePreview, setFilePreview] = useState(null);

  const fileInputRef = useRef(null);

  // const { handleSubmit } = useHandleSendingRequest();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImage(file);

    if (file) {
      // Create a URL from the selected file
      const reader = new FileReader();
      reader.onloadend = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUploadImage = () => {
    console.log(image);

    if (image) {
      alert("Image Uploaded successfully");
    }
    setSecondPage(false);
  };

  return (
    <>
      <div className="flex-center w-full h-full flex-col gap-5">
        {/* <div> */}
        <div className="w-full sm:w-80 flex items-center mt-6 justify-start flex-col">
          <div className="w-40 h-40 drop-shadow border border-slate-500 outline-slate-500 rounded-md relative mainImageBox overflow-hidden">
            {filePreview ? (
              <img src={filePreview} className="w-full h-full" alt="User Pic" />
            ) : (
              <Image className="w-full h-full" />
            )}

            <div
              className="absolute w-8 h-8 top-3 drop-shadow right-3 bg-slate-600 rounded-md flex-center cursor-pointer"
              title="Edit"
            >
              <Edit2
                size={20}
                type="button"
                onClick={() => fileInputRef.current.click()}
              />
            </div>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />
        </div>
        <div className="py-5 flex items-center gap-2">
          <button
            className="px-6 rounded-md py-2 border text-slate-100 border-slate-500 font-semibold transition-all hover:text-white hover:bg-slate-700 hover:shadow-md shadow-slate-300"
            onClick={() => setSecondPage(false)}
          >
            Not now
          </button>
          <button
            className={`${
              filePreview ? "block" : "hidden"
            } px-6 rounded-md py-2 border text-slate-100 border-slate-500 font-semibold transition-all hover:text-white hover:bg-slate-700 hover:shadow-md shadow-slate-300`}
            onClick={handleUploadImage}
          >
            Save
          </button>
          {/* </div> */}
        </div>
      </div>
    </>
  );
};
