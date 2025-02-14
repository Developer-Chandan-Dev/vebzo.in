/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import "./style.css";
import { Link } from "react-router-dom";
import { Image, ShoppingCart, Star } from "lucide-react";
import Button from "../../utility/Button";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../../store/features/cartSlice";
import { toast } from "react-toastify";

const ItemBox = ({ _id, name, category, price, imageUrl, rating }) => {
  const authUser = useSelector((state) => state.user.user);

  const dispatch = useDispatch();

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
    <div className="itemBox w-44 lg:w-52 xl:w-60 h-auto">
      <Link to={`/shop/${_id}`}>
        <div className="w-44 h-44 lg:w-52 lg:h-52 xl:w-60 xl:h-60 border mx-auto overflow-hidden itemImgBox">
          {imageUrl ? (
            <img
              src={imageUrl}
              className="w-full h-full object-fit cursor-pointer"
              alt={name}
            />
          ) : (
            <Image className="w-full h-full text-gray-300" />
          )}
        </div>
      </Link>
      <div className="flex-center flex-col py-5">
        <p>{category}</p>
        <h4 className="text-lg font-semibold py-1">{name}</h4>
        <div className="flex-center">
          <Star className="text-yellow-500 fill-yellow-300" size="18" />
          <Star className="text-yellow-500 fill-yellow-300" size="18" />
          <Star className="text-yellow-500 fill-yellow-300" size="18" />
          <Star className="text-yellow-500 fill-yellow-300" size="18" />
          <Star className="text-yellow-500 fill-yellow-300" size="18" />
        </div>
        <p className="mt-1">Rs. {price}</p>
        <Button
          label="Add to cart"
          sm={true}
          className={"mt-2"}
          LeftIcon={ShoppingCart}
          onClick={() => handleAddtoCart(_id)}
        />
      </div>
    </div>
  );
};

export default ItemBox;
