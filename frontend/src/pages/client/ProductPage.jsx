/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { Star } from "lucide-react";
import { useParams } from "react-router-dom";
import Footer from "../../components/client/Footer";
import Header from "../../components/client/Header";
import useFetchData from "../../hooks/useFetchData";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, fetchCartItems } from "../../store/features/cartSlice";

const VITE_API_URL = import.meta.env.VITE_API_URL;
const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);
  const [productId, setProductId] = useState("");

  const { id } = useParams();
  const { data, loading } = useFetchData(
    `${VITE_API_URL}/api/v1/products/details/${id}`
  );

  useEffect(() => {
    setProductId(data?.data?._id);
  }, [data?.data?._id]);

  const dispatch = useDispatch();
  // const { cartItems, status, error } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartItems());
  }, [dispatch]);

  const handleAddToCart = () => {
    dispatch(addToCart({ productId, quantity }));
  };

  return (
    <div className="w-full h-auto text-left">
      <Header />
      <div className="px-10 sm:px-20 py-10 sm:py-20 bg-[#f8f6f3]">
        <div className="flex items-start pb-14 gap-1 flex-wrap md:flex-nowrap">
          <div className="w-full xl:w-[550px] h-auto">
            <img
              src={
                data?.data?.imageUrl
                  ? data?.data?.imageUrl
                  : "/public/images/potato-1.webp"
              }
              className="w-full h-full object-fit"
              alt=""
            />
          </div>
          <div className="md:px-10 text-left w-full md:w-[650px] text-[15px]">
            <h1 className="text-4xl font-semibold amiri-quarn ">
              {data?.data?.name}
            </h1>
            <div className="flex items-center">
              <div className="flex-center py-5">
                <Star className="text-yellow-500 fill-yellow-300" size="18" />
                <Star className="text-yellow-500 fill-yellow-300" size="18" />
                <Star className="text-yellow-500 fill-yellow-300" size="18" />
                <Star className="text-yellow-500 fill-yellow-300" size="18" />
                <Star className="text-yellow-500 fill-yellow-300" size="18" />
              </div>
              <span className="ml-2">( 1 customer Review)</span>
            </div>
            <h3 className="text-xl font-bold py-1">
              Rs. {data?.data?.price}.00
            </h3>
            <p>{data?.data?.description}</p>
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
                  {data?.data?.category?.name}
                </span>
              </p>
            </div>
          </div>
        </div>

        <div className="w-full h-auto border-t text-[15px]">
          <ul className="flex items-center ">
            <li className="w-36 border flex-center h-12 font-semibold cursor-pointer">
              Description
            </li>
            <li className="w-36 border flex-center h-12 font-semibold cursor-pointer">
              Review
            </li>
          </ul>

          <div>
            <p className="py-3">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi
              magni, error adipisci possimus explicabo vel voluptates corporis
              dolorum dolor reiciendis tempora inventore exercitationem voluptas
              itaque, consequuntur minus. Necessitatibus ex, unde ipsam nam ab
              cum consequuntur fugit expedita. Quae, inventore nostrum.
              Reiciendis facilis porro sed enim aperiam earum quam dolorum qui!
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductPage;
