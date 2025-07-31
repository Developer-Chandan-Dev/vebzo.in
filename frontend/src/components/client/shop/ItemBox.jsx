/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import "./style.css";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  Heart,
  Image,
  IndianRupee,
  ShoppingCart,
  Star,
  ShoppingBag,
  LucideShoppingBasket,
} from "lucide-react";
import Button from "../../utility/Button";
import { addToCart, fetchCartItems } from "../../../store/features/cartSlice";
import useHandleSwitchRoutes from "../../../hooks/useHandleSwitchRoutes";
import { setBuyNowItem } from "../../../store/features/buyNowSlice";
import useFavorites from "../../../hooks/client/useFavorites";

const ItemBox = ({
  _id,
  name,
  category,
  categoryId,
  price,
  salesPrice,
  imageUrl,
  stock,
  rating,
}) => {
  const authUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();
  const items = useSelector((state) => state.buyNow);

  const { toggleFavorites, match } = useFavorites(_id);

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
      } else {
        console.log(data);
      }
    });
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  let off;
  if (salesPrice) {
    off = parseFloat(
      ((parseInt(salesPrice) - parseInt(price)) / parseInt(salesPrice)) * 100
    ).toFixed(0);
  }

  const discount = salesPrice ? `${off}% off` : "";

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

        <div className="absolute w-full h-10 top-0 right-1 flex items-center justify-between gap-3 px-3">
          <span
            className={`${
              salesPrice
                ? "w-auto text-xs px-2 py-[6px] bg-green-500 text-white border rounded-full"
                : ""
            } `}
          >
            {discount && discount}
          </span>
          <div className="flex items-center gap-3">
            {parseInt(stock) <= 5 && (
              <p className="px-3 py-1 text-xs rounded-full bg-orange-500 text-white">
                Low Stock
              </p>
            )}
            <div className="size-7 flex-center bg-white rounded-full  shadow-md shadow-slate-400">
              <Heart
                className={`size-5 ${
                  match && "fill-pink-600"
                } text-pink-600 cursor-pointer`}
                onClick={() => toggleFavorites(_id)}
              />
            </div>
            {/* <ShoppingCart className="text-white drop-shadow cursor-pointer" /> */}
          </div>
        </div>
      </div>
      <div className="flex-center flex-col py-5">
        <Link to={`/shop/category/${categoryId}`}>
          <p>{category}</p>
        </Link>
        <Link to={`/shop/${_id}`}>
          <h4 className="text-lg font-semibold py-1">
            {name?.length > 18 ? name.slice(0, 18) + "..." : name}
          </h4>
        </Link>
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
          {salesPrice && (
            <div
              className={`flex items-center ${
                salesPrice && "opacity-50 line-through"
              }`}
            >
              <IndianRupee className="size-[14px]" />
              <span className="text-[14px] ml-[2px]">
                {salesPrice?.toFixed(2)}
              </span>
            </div>
          )}

          <div className="flex items-center">
            <IndianRupee className="size-[14px]" />
            <span className="text-[14px] ml-[2px] font-semibold">
              {price?.toFixed(2)}
            </span>
          </div>
        </div>

        <Button
          label="Add to cart"
          sm={true}
          className={"mt-2"}
          disable={parseInt(stock) <= 5}
          LeftIcon={ShoppingCart}
          onClick={() =>
            authUser && parseInt(stock) > 5
              ? handleAddtoCart(_id)
              : handleGoToLoginPage()
          }
        />
        {authUser && (
          <Button
            label="Buy Now"
            sm={true}
            className={"mt-2"}
            bgHover="hover:bg-[#f0b22d]"
            bg="bg-[#dba839]"
            LeftIcon={LucideShoppingBasket}
            onClick={() =>
              authUser && parseInt(stock) > 5
                ? dispatch(
                    setBuyNowItem({
                      productId: _id,
                      name,
                      price,
                      quantity: 1,
                      imageUrl,
                    })
                  )
                : alert("Not able to buy now. (Login First)")
            }
          />
        )}
      </div>
    </motion.div>
  );
};

export default ItemBox;
