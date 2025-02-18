import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Heart, ShoppingCart, Star } from "lucide-react";
import useFetchData from "../../../hooks/useFetchData";
import Spinner from "../../utility/Spinner";
import Button from "../../utility/Button";
import { addToCart, fetchCartItems } from "../../../store/features/cartSlice";
import useHandleSwitchRoutes from "../../../hooks/useHandleSwitchRoutes";
const VITE_API_URL = import.meta.env.VITE_API_URL;

const BestSellingProducts = () => {
  const authUser = useSelector((state) => state.user.user);

  const { data, loading, error } = useFetchData(
    `${VITE_API_URL}/api/v1/products?bestSellingProducts=true`
  );

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
        Best Selling Products
      </h2>
      <img
        src="/public/images/logo-leaf-new.png"
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
                      <img
                        src={
                          product?.imageUrl
                            ? product?.imageUrl
                            : "/public/images/cauliflower-1.webp"
                        }
                        className="w-full h-full object-fit"
                        alt="Product Image"
                      />
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
                        {product?.name}
                      </h4>
                    </Link>
                    <div className="flex-center">
                      <Star
                        className="text-yellow-500 fill-yellow-300"
                        size="18"
                      />
                      <Star
                        className="text-yellow-500 fill-yellow-300"
                        size="18"
                      />
                      <Star
                        className="text-yellow-500 fill-yellow-300"
                        size="18"
                      />
                      <Star
                        className="text-yellow-500 fill-yellow-300"
                        size="18"
                      />
                      <Star
                        className="text-yellow-500 fill-yellow-300"
                        size="18"
                      />
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

export default BestSellingProducts;
