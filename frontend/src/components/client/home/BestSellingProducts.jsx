import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Heart, Image, ShoppingCart, Star } from "lucide-react";
import Spinner from "../../utility/Spinner";
import Button from "../../utility/Button";
import { addToCart, fetchCartItems } from "../../../store/features/cartSlice";
import useHandleSwitchRoutes from "../../../hooks/useHandleSwitchRoutes";
import LogoLeaf from "../../../assets/images/logo-leaf-new.png";
import { useContext } from "react";
import { FavsContext } from "../../../context/FavsContext";
import axios from "axios";
import ItemBoxForHome from "./ItemBoxForHome";

const BestSellingProducts = () => {

  const bsProducts = useSelector((state) => state?.bsItems);

  return (
    <div className="w-full px-5 sm:px-10 py-20 ">
      <h2 className="text-4xl font-semibold text-gray-700 head-line-1">
        Best Selling Products
      </h2>
      <img src={LogoLeaf} alt="Leaf" className="pt-7 pb-4 mx-auto" />

      {bsProducts?.isLoading && (
        <div className="w-full h-72 flex-center">
          <Spinner />
        </div>
      )}

      {bsProducts?.error && !bsProducts?.isLoading && (
        <p className="text-red-400">{bsProducts?.error}</p>
      )}

      {!bsProducts?.isLoading && !bsProducts?.error && (
        <div className="flex items-center justify-center flex-wrap gap-5 my-14">
          {bsProducts?.bsItems?.data?.length > 0 &&
            bsProducts?.bsItems?.data !== null &&
            bsProducts?.bsItems?.data.map((product) => (
              <ItemBoxForHome
                key={product?._id}
                _id={product?._id}
                imageUrl={product?.imageUrl}
                category={product?.category}
                name={product?.name}
                averageRating={product?.averageRating}
                price={product?.price}
              />
            ))}
        </div>
      )}
    </div>
  );
};

export default BestSellingProducts;
