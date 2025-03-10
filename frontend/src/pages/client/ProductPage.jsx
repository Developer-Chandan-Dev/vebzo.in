import { useEffect, useState } from "react";
import { Image, Star, IndianRupee } from "lucide-react";
import { useParams } from "react-router-dom";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import useFetchData from "../../hooks/useFetchData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/features/cartSlice";
import Spinner from "../../components/utility/Spinner";
import ReviewForm from "../../components/client/shop/ReviewForm";
import { toast } from "react-toastify";
import RelatedProducts from "../../components/client/shop/RelatedProducts";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState("");
  const [productData, setProductData] = useState(null);
  const [showDescription, setShowDescription] = useState(true);
  const [showReview, setShowReview] = useState(false);

  const authUser = useSelector((state) => state.user.user);

  const { id } = useParams();
  const { data, loading } = useFetchData(
    `${VITE_API_URL}/api/v1/products/details/${id}`
  );

  useEffect(() => {
    setProductId(data?.data?._id);
  }, [data?.data?._id]);

  useEffect(() => {
    setProductData(data?.data);
  }, [data?.data]);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCartItems(authUser?._id));
  }, [authUser?._id, dispatch]);

  const handleAddToCart = () => {
    dispatch(
      addToCart({
        userId: authUser?._id,
        productId,
        quantity: parseInt(quantity),
      })
    ).then((data) => {
      if (data?.payload?.success) {
        dispatch(fetchCartItems(authUser?._id));
        toast.success("Product is added to cart");
      }
    });
  };

  const handleShowDescription = () => {
    setShowDescription(true);
    setShowReview(false);
  };

  const handleShowReviews = () => {
    setShowDescription(false);
    setShowReview(true);
  };

  return (
    <div className="w-full h-auto text-left">
      <Header />

      {loading && (
        <div className="w-full h-[500px] flex-center">
          <Spinner />
        </div>
      )}
      {!loading && (
        <div className="px-5 sm:px-10 md:px-20 py-10 sm:py-20 bg-[#f8f6f3]">
          <div className="flex items-start pb-14 gap-1 flex-wrap md:flex-nowrap">
            <div className="w-full xl:w-[550px] h-auto">
              {productData?.imageUrl ? (
                <img
                  src={productData?.imageUrl}
                  className="w-full h-full object-fit"
                  alt=""
                />
              ) : (
                <Image />
              )}
            </div>
            <div className="md:px-10 text-left w-full md:w-[650px] text-[15px]">
              <h1 className="text-4xl font-semibold amiri-quarn ">
                {productData?.name}
              </h1>
              <div className="flex items-center">
                <div className="flex-center py-5">
                  {[...Array(parseInt(5))].map((_, index) => {
                    index += 1;
                    return (
                      <Star
                        key={index}
                        className={`${
                          index <= productData?.averageRating
                            ? "fill-yellow-300 text-yellow-500"
                            : "text-gray-400"
                        }`}
                        size="18"
                      />
                    );
                  })}
                </div>
                <span className="ml-2">
                  ( {productData?.totalRatings} customer Review)
                </span>
              </div>
              <div className="flex items-center gap-2">
                <h3
                  className={`font-bold py-1 flex items-center gap-1 ${
                    productData?.salesPrice && "opacity-50 line-through"
                  }`}
                >
                  <IndianRupee className="size-[18px]" />
                  <span className="text-xl "> {productData?.price}.00</span>
                </h3>
                {productData?.salesPrice && (
                  <h3 className="font-bold py-1 flex items-center gap-1">
                    <IndianRupee className="size-[18px]" />
                    <span className="text-xl ">
                      {" "}
                      {productData?.salesPrice}.00
                    </span>
                  </h3>
                )}
              </div>
              <p>{productData?.description}</p>
              <div className="flex items-center gap-2 py-4 border-b">
                <input
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="w-16 pl-4 pr-1 py-2 border outline-none"
                />
                <button
                  className="w-60 py-2 px-3 bg-[#6a9739] text-white text-semibold text-[14px] rounded-lg"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </button>
              </div>
              <div className="py-2">
                <p>
                  Categories :{" "}
                  <span className="text-[#6a9739]">
                    {" "}
                    {productData?.category?.name}
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className="w-full h-auto border-t text-[15px]">
            <ul className="flex items-center ">
              <li
                className="w-36 border flex-center h-12 font-semibold cursor-pointer"
                onClick={handleShowDescription}
              >
                Description
              </li>
              <li
                className="w-36 border flex-center h-12 font-semibold cursor-pointer"
                onClick={handleShowReviews}
              >
                Review
              </li>
            </ul>

            {showDescription && (
              <div className="mt-5">
                <p className="py-3">{productData?.description}</p>
              </div>
            )}

            {showReview && <ReviewForm productId={productId} />}
          </div>
        </div>
      )}

      <RelatedProducts categoryId={data?.data?.category?._id} />
      <Footer />
    </div>
  );
};

export default ProductPage;
