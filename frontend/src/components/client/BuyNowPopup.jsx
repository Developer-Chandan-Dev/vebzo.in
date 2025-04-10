import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../utility/Button";
import {
  clearBuyNow,
  updateBuyNowQuantity,
} from "../../store/features/buyNowSlice";

const BuyNowPopup = () => {
  const [quantities, setQuantities] = useState({});

  const items = useSelector((state) => state?.buyNow?.buyItem);

  const popupRef = useRef();

  const dispatch = useDispatch();

  const popupVariants = {
    open: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
    closed: {
      y: "-100%",
      opacity: 0,
      transition: { duration: 0.3 },
    },
  };

  const handleQuantityChange = (e, index) => {
    const value = parseInt(e.target.value);
    const validQuantity = value < 1 ? 1 : value;

    setQuantities((prev) => ({
      ...prev,
      [index]: validQuantity,
    }));

    dispatch(updateBuyNowQuantity({ index, quantity: validQuantity }));
  };

  return (
    <motion.div
      className="fixed flex-center left-0 top-0 w-full h-full z-50 drop-shadow bg-black text-slate-700 backdrop-filter backdrop-blur-sm bg-opacity-10 "
      ref={popupRef}
      initial="closed"
      animate={"open"}
      exit="closed"
      variants={popupVariants}
    >
      <div className=" w-11/12  sm:w-[400px] md:w-[600px] px-6 pt-5 pb-10 h-auto bg-white bg-opacity-90 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-6">
        <h2 className="text-2xl font-semibold pb-5">Buy Now</h2>
        <div className="flex-center flex-col gap-2">
          {items &&
            items.length > 0 &&
            items.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-5 flex-wrap justify-center"
              >
                <img
                  src={item?.imageUrl}
                  className="w-24 h-24 rounded-md border"
                />
                <ul className="">
                  <li className="flex item-center my-1">
                    <p className="w-40 pl-3 text-left">Name</p>
                    <p className="pl-3">{item?.name}</p>
                  </li>
                  <li className="flex item-center my-1">
                    <p className="w-40 pl-3 text-left ">Price</p>
                    <p className="pl-3">{item?.price}</p>
                  </li>
                  <li className="flex item-center my-1">
                    <p className="w-40 pl-3 text-left">Quantity</p>
                    <input
                      type="number"
                      className="pl-3 ml-2 border border-gray-200 w-14 py-1 px-1 rounded-sm"
                      value={item?.quantity || 1}
                      onChange={(e) => handleQuantityChange(e, index)}
                      min={1}
                    />
                  </li>
                  <li className="flex item-center my-1">
                    <p className="w-40 pl-3 text-left">Sub total</p>
                    <p className="pl-3">
                      {(item?.quantity || 1) * item?.price}
                    </p>
                  </li>
                </ul>
              </div>
            ))}
        </div>
        <div className="flex-center mt-8 gap-2">
          <Button
            label="Cancel"
            sm={true}
            onClick={() => dispatch(clearBuyNow())}
          />
          <Link to="/checkout">
            <Button label="Continue" sm={true} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default BuyNowPopup;
