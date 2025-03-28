import { Heart, Image, ShoppingCart, Star } from "lucide-react";
import useFetchData from "../../../hooks/useFetchData";
import { Link } from "react-router-dom";
import Spinner from "../../utility/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../../store/features/cartSlice";
import { toast } from "react-toastify";
import Button from "../../utility/Button";
import useHandleSwitchRoutes from "../../../hooks/useHandleSwitchRoutes";
import Leaf from "../../../assets/images/logo-leaf-new.png"
const VITE_API_URL = import.meta.env.VITE_API_URL;

const TrendingProducts = () => {
  const authUser = useSelector((state) => state.user.user);

  const { data, loading, error } = useFetchData(
    `${VITE_API_URL}/api/v1/products?isFeatured=true`
  );
  console.log(error);

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

  return (
    <div className="w-full px-5 sm:px-10 py-20 ">
      <h2 className="text-4xl font-semibold text-gray-700 head-line-1">
        Trending Products
      </h2>
      <img
        src={Leaf}
        alt="Leaf"
        className="pt-7 pb-4 mx-auto"
      />
      {loading && (
        <div className="w-full h-72 flex-center">
          <Spinner />
        </div>
      )}

      {!loading && (
        <div className="flex items-center justify-center flex-wrap gap-5 my-14">
          {data?.data.length > 0 && data?.data !== null
            ? data?.data.map((product) => (
                <div className="w-72 h-auto productBox" key={product._id}>
                  <Link to={`/shop/${product?._id}`}>
                    <div className=" w-72 h-72 border mx-auto overflow-hidden relative">
                      {product?.imageUrl ? (
                        <img
                          src={product?.imageUrl}
                          className="w-full h-full object-fit"
                          alt="Product Image"
                        />
                      ) : (
                        <Image className="w-full h-full object-fit" />
                      )}

                      <div className="absolute w-auto h-10 top-2 right-2 flex items-center gap-3 px-3">
                        <Heart className="text-white drop-shadow" />
                        <ShoppingCart className="text-white drop-shadow" />
                      </div>
                    </div>
                  </Link>
                  <div className="flex-center flex-col py-5">
                    <p>{product?.category?.name}</p>
                    <Link to={`/shop/${product?._id}`}>
                      <h4 className="text-lg font-semibold py-1">
                        {product?.name?.length > 18
                          ? product?.name?.slice(0, 18) + "..."
                          : product?.name}
                      </h4>
                    </Link>
                    <div className="flex-center">
                      {[...Array(parseInt(5))].map((_, index) => {
                        index += 1;
                        return (
                          <Star
                            key={index}
                            className={`${
                              index <= product?.averageRating
                                ? "fill-yellow-300 text-yellow-500"
                                : "text-gray-400"
                            }`}
                            size="18"
                          />
                        );
                      })}
                    </div>
                    <p className="mt-1">Rs. {product?.price}.00</p>
                    <Button
                      label="Add to cart"
                      sm={true}
                      className={"mt-2"}
                      LeftIcon={ShoppingCart}
                      onClick={() =>
                        authUser
                          ? handleAddtoCart(product?._id)
                          : handleGoToLoginPage()
                      }
                    />
                  </div>
                </div>
              ))
            : ""}
        </div>
      )}
    </div>
  );
};

export default TrendingProducts;
