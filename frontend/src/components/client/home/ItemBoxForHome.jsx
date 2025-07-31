/* eslint-disable react/prop-types */
import { Heart, Image, ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../../utility/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../../store/features/cartSlice";
import { toast } from "react-toastify";
import useHandleSwitchRoutes from "../../../hooks/useHandleSwitchRoutes";
import useFavorites from "../../../hooks/client/useFavorites";

const ItemBoxForHome = ({
  _id,
  imageUrl,
  category,
  name,
  averageRating,
  price,
}) => {
  const authUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

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
      }
    });
  }

  return (
    <div className="w-72 h-auto productBox">
      <div className=" w-72 h-72 border mx-auto overflow-hidden relative">
        <Link to={`/shop/${_id}`}>
          {imageUrl ? (
            <img
              src={imageUrl}
              className="w-full h-full object-fit"
              alt="Product Image"
            />
          ) : (
            <Image className="w-full h-full object-fit" />
          )}
        </Link>

        <div className="absolute w-auto h-10 top-2 right-2 flex items-center gap-3 px-3">
          <div className="size-7 flex-center bg-white rounded-full shadow-md shadow-slate-400">
            <Heart
              className={`size-5 drop-shadow ${
                match && "fill-pink-600"
              } text-pink-600 cursor-pointer`}
              onClick={() =>
                authUser ? toggleFavorites(_id) : handleGoToLoginPage()
              }
            />
          </div>
          
        </div>
      </div>

      <div className="flex-center flex-col py-5">
        <Link to={`/shop/category/${category?._id}`}>
          <p>{category?.name}</p>
        </Link>
        <Link to={`/shop/${_id}`}>
          <h4 className="text-lg font-semibold py-1">
            {name?.length > 18 ? name?.slice(0, 18) + "..." : name}
          </h4>
        </Link>
        <div className="flex-center">
          {[...Array(parseInt(5))].map((_, index) => {
            index += 1;
            return (
              <Star
                key={index}
                className={`${
                  index <= averageRating
                    ? "fill-yellow-300 text-yellow-500"
                    : "text-gray-400"
                }`}
                size="18"
              />
            );
          })}
        </div>
        <p className="mt-1">Rs. {price}.00</p>
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
    </div>
  );
};

export default ItemBoxForHome;
