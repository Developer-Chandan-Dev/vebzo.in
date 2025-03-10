/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./style.css";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Heart, Image, IndianRupee, ShoppingCart, Star } from "lucide-react";
import Button from "../../utility/Button";
import { addToCart, fetchCartItems } from "../../../store/features/cartSlice";
import useHandleSwitchRoutes from "../../../hooks/useHandleSwitchRoutes";

const ItemBox = ({
  _id,
  name,
  category,
  price,
  salesPrice,
  imageUrl,
  rating,
}) => {
  const authUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

  const { handleGoToLoginPage } = useHandleSwitchRoutes();

  function handleAddtoCart(getCurrentProductId) {
    dispatch(
      addToCart({
        userId: authUser?._id,
        productId: getCurrentProductId,
        quantity: 1,
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(authUser?._id));
        toast.success("Product is added to cart");
      }
    });
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <motion.div
      variants={itemVariants}
      className="itemBox w-44 lg:w-52 xl:w-60 h-auto"
    >
      <div className="w-44 h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 border mx-auto overflow-hidden itemImgBox relative">
        <Link to={`/shop/${_id}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              className="w-full h-full object-fit cursor-pointer"
              alt={name}
            />
          ) : (
            <Image className="w-full h-full text-gray-300" />
          )}
        </Link>
        <div className="absolute w-auto h-10 top-1 right-1 flex items-center gap-3 px-3">
          <Heart
            className="drop-shadow text-pink-500 cursor-pointer ring-pink-600"
            onClick={() => alert("Clicked")}
          />
          <ShoppingCart className="text-white drop-shadow cursor-pointer" />
        </div>
      </div>
      <div className="flex-center flex-col py-5">
        <p>{category}</p>
        <h4 className="text-lg font-semibold py-1">
          {name?.length > 18 ? name.slice(0, 18) + "..." : name}
        </h4>
        <div className="flex-center">
          {[...Array(parseInt(5))].map((_, index) => {
            index += 1;
            return (
              <Star
                key={index}
                className={`${
                  index <= rating
                    ? "fill-yellow-300 text-yellow-500"
                    : "text-gray-400"
                }`}
                size="18"
              />
            );
          })}
        </div>
        <div className="mt-1 flex items-center gap-2 text-gray-800  font-semibold">
          <div
            className={`flex items-center ${
              salesPrice && "opacity-50 line-through"
            }`}
          >
            <IndianRupee className="size-[14px]" />
            <span className="text-[14px] ml-[2px]">{price.toFixed(2)}</span>
          </div>
          {salesPrice && (
            <div className="flex items-center">
              <IndianRupee className="size-[14px]" />
              <span className="text-[14px] ml-[2px] font-semibold">
                {salesPrice?.toFixed(2)}
              </span>
            </div>
          )}
        </div>
        <Button
          label="Add to cart"
          sm={true}
          className={"mt-2"}
          LeftIcon={ShoppingCart}
          onClick={() =>
            authUser ? handleAddtoCart(_id) : handleGoToLoginPage()
          }
        />
      </div>
    </motion.div>
  );
};

export default ItemBox;
